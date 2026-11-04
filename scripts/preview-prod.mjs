/**
 * Sirve dist/ como lo haría Cloudflare Pages: aplica las reglas de dist/_headers que empiezan
 * por "/" (incluida la CSP), barra final en directorios, 404.html y compresión Brotli de texto
 * (como hace Cloudflare). Solo para QA local.
 * Uso: npm run preview:prod  →  http://localhost:4322
 */
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { createBrotliCompress } from 'node:zlib';
import { extname, join, normalize } from 'node:path';

const DIST = 'dist';
const PORT = Number(process.env.PORT ?? 4322);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4',
};

// Reglas de _headers: [patrón, cabeceras]
const rules = [];
let current = null;
for (const raw of readFileSync(join(DIST, '_headers'), 'utf8').split('\n')) {
  if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
  if (!raw.startsWith(' ')) {
    current = { pattern: raw.trim(), headers: {} };
    rules.push(current);
  } else if (current) {
    const i = raw.indexOf(':');
    current.headers[raw.slice(0, i).trim()] = raw.slice(i + 1).trim();
  }
}
const matches = (pattern, path) =>
  pattern.startsWith('/') && new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`).test(path);

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let path = decodeURIComponent(url.pathname);
  let file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) return res.writeHead(403).end();

  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!path.endsWith('/')) return res.writeHead(308, { Location: `${path}/${url.search}` }).end();
    file = join(file, 'index.html');
  }
  let status = 200;
  if (!existsSync(file)) {
    file = join(DIST, '404.html');
    status = 404;
  }
  const headers = { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' };
  rules.filter((r) => matches(r.pattern, path)).forEach((r) => Object.assign(headers, r.headers));
  // En localhost (http) no aplican: HSTS y upgrade-insecure-requests (WebKit sí lo aplica a localhost).
  delete headers['Strict-Transport-Security'];
  if (headers['Content-Security-Policy']) {
    headers['Content-Security-Policy'] = headers['Content-Security-Policy'].replace(/;\s*upgrade-insecure-requests/, '');
  }
  const compressible = /^(text\/|application\/(json|xml)|image\/svg)/.test(headers['Content-Type']);
  if (compressible && /\bbr\b/.test(req.headers['accept-encoding'] ?? '')) {
    headers['Content-Encoding'] = 'br';
    res.writeHead(status, headers);
    createReadStream(file).pipe(createBrotliCompress()).pipe(res);
    return;
  }
  res.writeHead(status, headers);
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`dist/ con _headers en http://localhost:${PORT}`));
