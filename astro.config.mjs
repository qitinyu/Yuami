import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import remarkCallout from './src/utils/remark-callout';

export default defineConfig({
  site: 'https://8872388.xyz',
  output: 'static',
  adapter: cloudflare(),
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkCallout],
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
});
