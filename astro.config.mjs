// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

/**
 * Avisa (sin fallar) si se construye sin endpoint de formularios.
 * @type {import('astro').AstroIntegration}
 */
const formEndpointWarning = {
  name: 'ceramis:form-endpoint-warning',
  hooks: {
    'astro:build:start': ({ logger }) => {
      const env = { ...loadEnv('production', process.cwd(), 'PUBLIC_'), ...process.env };
      if (!env.PUBLIC_FORM_ENDPOINT) {
        logger.warn('PUBLIC_FORM_ENDPOINT está vacío: los formularios mostrarán un error al enviar.');
      }
    },
  },
};

export default defineConfig({
  site: 'https://ceramisagency.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap(), formEndpointWarning],
  devToolbar: { enabled: false },
  env: {
    schema: {
      PUBLIC_DASHBOARD_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://app.ceramisagency.com',
      }),
      PUBLIC_FORM_ENDPOINT: envField.string({ context: 'client', access: 'public', default: '' }),
      PUBLIC_CF_ANALYTICS_TOKEN: envField.string({ context: 'client', access: 'public', default: '' }),
    },
  },
});
