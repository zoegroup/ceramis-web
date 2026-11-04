/**
 * Post-build (se ejecuta tras `astro build`):
 * 1. Valida todos los JSON-LD de dist/ (JSON correcto y campos mínimos por tipo). Si un JSON no parsea, falla.
 * 2. Calcula el hash SHA-256 de cada script inline ejecutable y escribe una Content-Security-Policy
 *    estricta en dist/_headers. La CSP nativa de Astro no es compatible con <ClientRouter />.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadEnv } from 'vite';

const DIST = 'dist';
const env = { ...loadEnv('production', process.cwd(), 'PUBLIC_'), ...process.env };

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? htmlFiles(path) : name.endsWith('.html') ? [path] : [];
  });
}

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
const required = {
  Organization: ['name', 'url', 'logo'],
  WebSite: ['name', 'url'],
  Service: ['name', 'provider', 'areaServed'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  BlogPosting: ['headline', 'image', 'datePublished', 'author', 'publisher'],
};

const hashes = new Set();
const warnings = [];
let errors = 0;
let ldCount = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(SCRIPT_RE)) {
    if (/\bsrc=/.test(attrs)) continue;
    if (/type="application\/ld\+json"/.test(attrs)) {
      ldCount++;
      try {
        const data = JSON.parse(body);
        const nodes = data['@graph'] ?? [data];
        if (!data['@context']) warnings.push(`${file}: JSON-LD sin @context`);
        for (const node of nodes) {
          const types = [node['@type']].flat();
          for (const type of types) {
            for (const key of required[type] ?? []) {
              const v = node[key];
              if (v === undefined || (Array.isArray(v) && v.length === 0)) warnings.push(`${file}: ${type} sin "${key}"`);
            }
          }
        }
      } catch (e) {
        errors++;
        console.error(`✗ JSON-LD inválido en ${file}: ${e.message}`);
      }
      continue;
    }
    if (!body.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
}

if (errors) {
  console.error(`postbuild: ${errors} JSON-LD inválido(s).`);
  process.exit(1);
}

const formOrigin = (() => {
  try {
    return env.PUBLIC_FORM_ENDPOINT ? new URL(env.PUBLIC_FORM_ENDPOINT).origin : '';
  } catch {
    console.warn('postbuild: PUBLIC_FORM_ENDPOINT no es una URL válida; no se añade a connect-src.');
    return '';
  }
})();

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(' ')} https://static.cloudflareinsights.com`,
  // GSAP, Lenis y las View Transitions escriben estilos en línea.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://cloudflareinsights.com${formOrigin ? ` ${formOrigin}` : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const line = `  Content-Security-Policy: ${csp}`;
if (line.length > 2000) {
  console.error(`postbuild: la CSP mide ${line.length} caracteres (máximo de Cloudflare: 2000).`);
  process.exit(1);
}

const headersPath = join(DIST, '_headers');
const headers = readFileSync(headersPath, 'utf8');
writeFileSync(headersPath, headers.replace(/^\/\*\n/m, `/*\n${line}\n`));

warnings.forEach((w) => console.warn(`⚠ ${w}`));
console.log(
  `postbuild: ${ldCount} JSON-LD válidos, ${warnings.length} avisos; CSP con ${hashes.size} hashes` +
    (formOrigin ? ` y connect-src ${formOrigin}.` : ' (sin endpoint de formularios).')
);
