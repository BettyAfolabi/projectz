import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@tailwindcss/vite'; 

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'static',
  adapter: isProd ? cloudflare({ mode: 'directory' }) : undefined,
  vite: {
    plugins: [tailwind()], 
  },
});