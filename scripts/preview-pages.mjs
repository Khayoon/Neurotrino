import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

export function servePages(port = 3020) {
  const root = resolve('out');
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '/Neurotrino';
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.woff2': 'font/woff2' };
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === base && base) { res.writeHead(308, { Location: `${base}/${url.search}` }).end(); return; }
      if (!url.pathname.startsWith(`${base}/`)) throw new Error('Outside base path');
      const path = resolve(root, decodeURIComponent(url.pathname.slice(base.length + 1)));
      const rel = relative(root, path);
      if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Outside public root');
      const info = await stat(path);
      if (info.isDirectory() && !url.pathname.endsWith('/')) { res.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end(); return; }
      const file = info.isDirectory() ? resolve(path, 'index.html') : path;
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(await readFile(file));
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(await readFile(resolve(root, '404.html')));
    }
  }).listen(port, '127.0.0.1');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  servePages();
  console.log('Pages preview: http://127.0.0.1:3020/Neurotrino/');
}
