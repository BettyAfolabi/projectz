import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({ mode: 'directory' }),
  integrations: [tailwind(), mdx(), react()],
});