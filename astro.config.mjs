import { defineConfig } from 'astro/config';
import remarkToc from './src/utils/remark-toc';
import remarkCallout from './src/utils/remark-callout';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkToc, remarkCallout],
  },
});
