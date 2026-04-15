import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ request }) => {
  const region =
    request.headers.get('x-vercel-edge-region') ??
    request.headers.get('cf-ray')?.split('-').at(-1) ??
    'local';

  return new Response(JSON.stringify({ region }), {
    headers: { 'Content-Type': 'application/json' },
  });
};