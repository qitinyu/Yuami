import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://yqamm.cc.cd',
  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },

  adapter: cloudflare()
});