# Elizabeth Afolabi — Portfolio v3

Personal portfolio and engineering showcase. Built with intentionality, every architectural decision here is deliberate.

🔗 **[devduchess.dev](devduchess.betty4web.workers.dev)**

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 5 | Zero-JS by default, content collections, view transitions |
| Styling | Tailwind CSS v3 | Utility-first, consistent design tokens |
| Language | TypeScript | Type-safe content schema and component props |
| Deployment | Cloudflare Pages | Global edge CDN, Workers runtime, automatic deploys from `main` |
| Blog | Medium RSS | Posts fetched at build time via `fast-xml-parser` |

---

## Project Structure

```
src/
├── components/
│   ├── islands/        # React islands (CommandPalette, ThemeSwitcher)
│   ├── layouts/        # BaseLayout.astro
│   ├── sections/       # Page sections (Hero, Experience, SelectedWork…)
│   └── ui/             # Reusable primitives (ProjectCard)
├── content/
│   ├── projects/       # MDX files — one per project
│   └── config.ts       # Typed content collection schema
├── data/
│   └── commands.ts     # CommandPalette command registry
├── lib/
│   ├── medium.ts       # Medium RSS feed fetcher
│   └── theme.ts        # Theme utilities
├── pages/
│   ├── api/            # Cloudflare Worker edge functions
│   ├── blog/           # Blog index + post routes
│   ├── projects/       # Project detail pages ([slug].astro)
│   └── index.astro     # Homepage
├── scripts/
│   └── ui.ts           # Client-side reveal + scroll behaviour
└── styles/
    └── global.css      # Design tokens, view transitions, reveal system
```

---

## Architecture Notes

**Islands architecture** — interactive components (`CommandPalette`, `ThemeSwitcher`) are React islands hydrated with `client:load`. Everything else is zero-JS static HTML.

**Content collections** — projects are typed MDX files with a Zod schema. Adding a new project means dropping a `.mdx` file — no code changes required.

**Reveal system** — scroll-triggered animations use a CSS class (`is-visible`) toggled by an `IntersectionObserver` in `scripts/ui.ts`. No animation library dependency.

**Command palette** — `⌘K` opens a full-site search across nav sections, projects, blog posts (fetched from Medium at build time), and quick actions (copy email, download CV).

**Build-time data fetching** — Medium posts are fetched once at build time and inlined into the static output. No client-side fetch on page load.

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → ./dist
npm run preview    # preview production build locally
```

To regenerate the Lighthouse report:

```bash
lighthouse https://devduchess.betty4web.workers.dev \
  --output html \
  --output-path ./public/lighthouse.html \
  --chrome-flags="--headless"
```

---

*v3 — rebuilt from scratch. [See the iteration history](https://devduchess.betty4web.workers.dev/#iterations) on the site.*