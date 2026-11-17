// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
    sitemap({ filter: (page) => !/\/(aviso-legal|privacidad|cookies)\/$|\/blog\/etiqueta\//.test(page) }),
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
