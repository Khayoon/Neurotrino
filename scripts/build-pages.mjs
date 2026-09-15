import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const stage = resolve(root, '.pages-build');
const out = resolve(root, 'out');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/Neurotrino';
if (basePath && !/^\/[A-Za-z0-9_-]+$/.test(basePath)) throw new Error('Use an empty base path or one repository path, such as /Neurotrino.');
// Cleanup is restricted to the two generated directories in this checkout.
for (const path of [stage, out]) {
  const rel = relative(root, path);
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) throw new Error(`Unsafe generated path: ${path}`);
  await rm(path, { recursive: true, force: true });
}
await mkdir(stage, { recursive: true });
await cp(resolve(root, 'src'), resolve(stage, 'src'), { recursive: true });
await cp(resolve(root, 'package.json'), resolve(stage, 'package.json'));
await cp(resolve(root, 'next-env.d.ts'), resolve(stage, 'next-env.d.ts'));
const tsconfig = JSON.parse(await readFile(resolve(root, 'tsconfig.json'), 'utf8'));
tsconfig.include = ['next-env.d.ts', 'src/**/*.ts', 'src/**/*.tsx', '.next/types/**/*.ts'];
await writeFile(resolve(stage, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

function run(args, cwd = root) {
  return new Promise((accept, reject) => {
    const child = spawn(process.execPath, ['--preserve-symlinks', '--preserve-symlinks-main', ...args], {
      cwd, stdio: 'inherit', env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, NEXT_TELEMETRY_DISABLED: '1' },
    });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? accept() : reject(new Error(`Pages build step failed (${code}).`)));
  });
}
await run(['--import', 'tsx', 'scripts/export-public-catalogue.ts']);
await rm(resolve(stage, 'seed-data'), { recursive: true, force: true });
await rm(resolve(stage, 'src/app/api'), { recursive: true, force: true });
for (const file of ['lib/auth.ts', 'lib/health-canada.ts', 'components/review-desk.tsx']) {
  await rm(resolve(stage, 'src', file));
}
await cp(resolve(root, 'scripts/pages-review.tsx'), resolve(stage, 'src/app/review/page.tsx'));
// This build-only adapter has no database connection or mutation methods.
await writeFile(resolve(stage, 'src/lib/db.ts'), `
import catalogue from '@/data/public-catalogue.json';
import type { Product } from './types';
export async function getProducts(): Promise<Product[]> { return catalogue.products as Product[]; }
export async function getProduct(slug: string) { return (await getProducts()).find(p => p.slug === slug || p.npn === slug); }
export async function getBrands() { return catalogue.brands; }
export async function getAudit(id?: string) { const histories = catalogue.histories as Record<string, Array<{id:string;action:string;actor:string;created_at:string}>>; return id ? histories[id] || [] : Object.values(histories).flat(); }
export async function getSyncRuns(): Promise<Array<{id:string;status:string;started_at:string;succeeded:number;failed:number;message:string}>> { return []; }
`);
const layoutPath = resolve(stage, 'src/app/layout.tsx');
const layout = await readFile(layoutPath, 'utf8');
if (!layout.includes("export const dynamic='force-dynamic';")) throw new Error('Review the root layout static export configuration.');
await writeFile(layoutPath, layout.replace("export const dynamic='force-dynamic';", "export const dynamic='auto';"));
for (const [route, expression] of [
  ['supplements', "(await import('@/data/ingredients')).ingredients.map(i => ({ slug: i.slug }))"],
  ['products', "(await (await import('@/lib/db')).getProducts()).map(p => ({ slug: p.slug }))"],
  ['brands', "(await (await import('@/lib/db')).getBrands()).map(b => ({ slug: b.id }))"],
]) {
  const file = resolve(stage, `src/app/${route}/[slug]/page.tsx`);
  await writeFile(file, await readFile(file, 'utf8') + `\nexport const dynamicParams = false;\nexport async function generateStaticParams() { return ${expression}; }\n`);
}
await writeFile(resolve(stage, 'src/app/robots.ts'), `import type { MetadataRoute } from 'next';\nexport const dynamic = 'force-static';\nexport default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '${basePath}/', disallow: '${basePath}/review/' } }; }\n`);
await writeFile(resolve(stage, 'next.config.mjs'), `export default { outputFileTracingRoot: ${JSON.stringify(root)}, output: 'export', trailingSlash: true, basePath: ${JSON.stringify(basePath)}, poweredByHeader: false, images: { unoptimized: true }, env: { NEXT_PUBLIC_STATIC_EDITION: 'true', NEXT_PUBLIC_BASE_PATH: ${JSON.stringify(basePath)} } };\n`);
await run([resolve(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], stage);
await cp(resolve(stage, 'out'), out, { recursive: true });
await writeFile(resolve(out, '.nojekyll'), '');
console.log(`GitHub Pages output: ${out} (base path ${basePath || '/'})`);
