# Omoakins — Portfolio

Portfolio site for **Timi (Omoakin)** — a brand & product designer moving into product design.
Dark editorial theme, bento landing, filterable work, case studies, blog and landing pages.

Built with [Astro](https://astro.build) as a static site, hosted on Vercel.

## Run locally

Needs Node.js 22.12+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Where to make changes

All content lives in `src/content/` (`src/content.config.ts` describes every field):

| What | File |
|---|---|
| A case study | `src/content/projects/<slug>.json` → `/work/<slug>` |
| A blog post | `src/content/posts/<slug>.md` → `/blog/<slug>` |
| A landing page | `src/content/pages/<slug>.json` → `/<slug>` |
| Testimonials | `src/content/testimonials.json` |
| Hero, About, Contact copy, socials | `src/content/site.json` |
| Colours / spacing / type | `:root` variables at the top of `src/styles/global.css` |

Set `"draft": true` on anything to keep it off the live site; drafts still show locally and on Vercel preview links.

Each page gets its own title, description and a generated share image (`/og/...png`), plus a sitemap at `/sitemap-index.xml`.

## Deploy

Vercel builds every push to `main` automatically (framework: Astro, no extra settings).
Set `SITE_URL` in Vercel if you add a custom domain, so share links and the sitemap use it.
