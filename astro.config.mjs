// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ceramisagency.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
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
