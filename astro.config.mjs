import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'static',
  adapter: isProd ? cloudflare({ mode: 'directory' }) : undefined,
  integrations: [tailwind(), mdx(), react()],
});