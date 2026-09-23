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

- **Words, images, projects, blog posts, landing pages, testimonials, menu:** the dashboard at `/admin`.
  Save a draft, preview it, then Publish; the site rebuilds in about a minute.
- **Colours / spacing / type:** the `:root` variables at the top of `src/styles/global.css`.
- **Page templates:** `src/views/`. **Content shapes:** `src/lib/schema.ts`. See `CLAUDE.md` for how it all fits.

## Deploy

Vercel builds every push to `main` automatically (framework: Astro). Set `DEPLOY_HOOK_URL` in Vercel
(a Deploy Hook for `main`) so the dashboard's Publish button can rebuild the site.
Set `SITE_URL` in Vercel if you add a custom domain, so share links and the sitemap use it.
