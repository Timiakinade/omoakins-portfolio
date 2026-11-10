# Omoakins portfolio

Next.js (App Router) on Vercel, Supabase behind it. Case studies are ordered
arrays of blocks, so every project can be a different length and shape.

## Run locally

    npm install
    npm run dev

With no env vars set, the site runs on the built in content in `lib/content/`.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Vercel: Add New Project, import the repo. Framework is detected as Next.js. No settings needed.
3. Every push to `main` deploys.

## Connect Supabase (when ready)

1. Create a Supabase project. SQL editor: run `supabase/schema.sql`, then add your email to `public.admins`.
2. Vercel, Settings, Environment Variables: add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Redeploy.
3. Until the tables have rows, the site keeps using the built in content.

## Where things live

| What | File |
|---|---|
| Case studies (seed) | `lib/content/case-studies.js` |
| Site text, FAQ, filter labels | `lib/content/settings.js` |
| Block types | `lib/blocks.js`, rendered in `components/blocks/Blocks.js` |
| Tokens and layout | `app/globals.css` |

Each case study carries a `theme` object (colours, display face) applied as CSS variables,
so the interior changes per study while nav, footer and cards stay constant.

## Before launch (TODO markers in the content files)

- Email, Behance profile and LinkedIn URLs in `settings.js`
- About copy, FAQ answers, toolkit: drafts to confirm
- UBA: 8 vs 10 testers, timeline, client or self initiated (badge)
- Providus and LG: on site write ups, LG Behance link, exact Providus brand hex
- Real images: every empty `src` renders a sized placeholder frame
