/**
 * Lista los placeholders pendientes ([EMAIL], [POR DEFINIR], [VALIDAR]…) en src/, agrupados por archivo.
 * Uso: npm run placeholders            → listado completo
 *      npm run placeholders -- --summary → solo el recuento por tipo
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'src';
const EXT = /\.(astro|ts|mdx|md)$/;
// Mayúsculas entre corchetes: [EMAIL], [POR DEFINIR], [DATO A VALIDAR]… (no arrays ni tipos de TS)
const RE = /\[([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9 ]{2,})\]/g;

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : EXT.test(name) ? [path] : [];
  });
}

const byFile = new Map();
const byType = new Map();
for (const file of files(ROOT)) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const [, tag] of line.matchAll(RE)) {
        const key = relative('.', file);
        if (!byFile.has(key)) byFile.set(key, []);
        byFile.get(key).push(`${i + 1}: [${tag}]`);
        byType.set(tag, (byType.get(tag) ?? 0) + 1);
      }
    });
}

if (!process.argv.includes('--summary')) {
  for (const [file, hits] of byFile) {
    console.log(`\n${file}`);
    hits.forEach((h) => console.log(`  ${h}`));
  }
  console.log('');
}
console.log('Pendientes por tipo:');
[...byType.entries()].sort((a, b) => b[1] - a[1]).forEach(([tag, n]) => console.log(`  ${String(n).padStart(3)}  [${tag}]`));
console.log(`\nTotal: ${[...byType.values()].reduce((a, b) => a + b, 0)} en ${byFile.size} archivos.`);
