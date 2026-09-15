import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

// Always seed an isolated build database. Never publish an editor's runtime data.
delete process.env.DATABASE_URL;
process.env.NEUROTRINO_DATA_DIR = resolve('.pages-build/seed-data');
const { getDb, getProducts, getBrands, getAudit } = await import('../src/lib/db');
try {
  const products = await getProducts();
  const histories = Object.fromEntries(await Promise.all(products.map(async p => [p.id, await getAudit(p.id)])));
  await writeFile(resolve('.pages-build/src/data/public-catalogue.json'), JSON.stringify({ products, brands: await getBrands(), histories }));
  console.log(`Exported ${products.length} public product records from checked-in sources.`);
} finally {
  await (await getDb()).close();
}
