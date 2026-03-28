import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'static',
  adapter: isProd ? cloudflare({ mode: 'directory' }) : undefined,

  vite: {
    plugins: [tailwind()], 
  },

  integrations: [mdx(), react()],
});