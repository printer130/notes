import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

const url = import.meta.VERCEL_ENV === 'production' ? 'https://the-notes-ten.vercel.app/' : 'http://localhost:3001'

// https://astro.build/config
export default defineConfig({
  site: 'https://the-notes-ten.vercel.app/',
  integrations: [mdx(), sitemap(), tailwind()]
});