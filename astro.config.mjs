// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

/** Fecha de cada artículo (updated o date del frontmatter) para el <lastmod> del sitemap. */
const postDates = Object.fromEntries(
  readdirSync('src/content/blog')
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const fm = readFileSync(`src/content/blog/${f}`, 'utf8');
      const d = fm.match(/^updated:\s*(\S+)/m)?.[1] ?? fm.match(/^date:\s*(\S+)/m)?.[1];
      return [`/blog/${f.replace(/\.mdx$/, '')}/`, d];
    })
);

export default defineConfig({
  site: 'https://ceramisagency.com',
  output: 'static',
  trailingSlash: 'always',
  // CSS siempre inline: cero hojas bloqueantes (la CSP permite estilos inline).
  build: { format: 'directory', inlineStylesheets: 'always' },
  // Preparado para EN/DE más adelante: el español va sin prefijo (/servicios/, no /es/servicios/).
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    // Las legales y las etiquetas del blog llevan noindex: fuera del sitemap.
    sitemap({
      filter: (page) => !/\/(aviso-legal|privacidad|cookies)\/$|\/blog\/etiqueta\//.test(page),
      // <lastmod> solo donde la fecha es real (artículos): así Google sabe qué volver a rastrear.
      serialize: (item) => {
        const date = postDates[new URL(item.url).pathname];
        return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
      },
    }),
  ],
  devToolbar: { enabled: false },
  // Precarga la página de cualquier enlace interno al pasar el ratón o tocarlo: la navegación es casi instantánea.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Ningún script de módulo inline: así <ClientRouter /> no necesita inyectar un script `data:`
  // y la CSP puede ser estricta (ver scripts/postbuild.mjs).
  vite: { build: { assetsInlineLimit: 0 } },
  env: {
    schema: {
      PUBLIC_DASHBOARD_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://app.ceramisagency.com',
      }),
      // Vacío = la función de Cloudflare /api/contacto (envía el email). Solo para usar otro destino.
      PUBLIC_FORM_ENDPOINT: envField.string({ context: 'client', access: 'public', default: '' }),
      PUBLIC_CF_ANALYTICS_TOKEN: envField.string({ context: 'client', access: 'public', default: '' }),
    },
  },
});
