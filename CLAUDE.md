# CLAUDE.md — context for Claude Code

Read this first when picking up this repo.

## What this is
A static portfolio site for **Timi (Omoakin)** — brand & product designer moving into product
design. Verticals: finance, food, healthcare, hospitality. Brand/wordmark: **Omoakins**.
It is NOT Mide's portfolio — do not attribute it to Mide.

Three surfaces exist for this project; **this repo is the code source of truth**:
- This repo (the deployable site).
- A Figma design file (design source): file key `ATcaegesPAYx7Rqyn8ukRl`, "Omoakins Portfolio (Timi)".
- A Claude artifact preview (was the working preview; keep or retire).
These are not auto-synced — a change here does not update Figma or the artifact.

## Stack
Astro on Vercel (public pages prerendered; `/admin`, `/preview`, `/api` run on demand via `@astrojs/vercel`).
Content lives in **Supabase** (project `sqffpsyywzgxkjkjwlue`), not in the repo. Code in GitHub `Timiakinade/omoakins-portfolio`.
Node lives at `~/.local/node/bin` on Timi's Mac (not on PATH — prefix commands with `export PATH=$HOME/.local/node/bin:$PATH`).
Fonts: Bebas Neue (display), DM Sans (body), Space Mono (mono labels) via Google Fonts;
`@fontsource` copies are used only to draw share images.

Roadmap: phase 1 (Astro site) and phase 2 (dashboard) done; phase 3 = messages inbox + visitor analytics
(the sidebar already shows them as "Coming soon").

## How content works
- Table `public.entries`: one row per item (`type` = project | post | page | testimonial | settings, `slug`),
  with `draft` (being edited) and `published` (live) JSON. Schema + RLS: `supabase/migrations/`.
  The public (publishable) key can read only `published`; only emails in `public.admins` can do anything else.
- The build reads published rows (`src/content.config.ts` loaders → `src/lib/content.ts`).
- Dashboard at `/admin` (email + password, Timi only). Sidebar by page (`src/admin/nav.ts`); form fields and
  plain-language labels in `src/admin/fields.ts`; editor UI `src/admin/Editor.tsx` (Preact).
  Site settings is one row split across screens; each screen publishes only its own keys.
- Save draft → Preview (`/admin/preview/...` full screen, iframe of `/preview/...`) → Publish
  (`/api/admin/publish` validates with `src/lib/schema.ts`, copies draft → published, calls Vercel `DEPLOY_HOOK_URL`).
- Images upload to the Supabase Storage bucket `media`.
- `/api/keepalive` runs daily (Vercel cron) so the free Supabase project doesn't pause.
- Password reset: Supabase → Authentication → Users → delete and re-add Timi with Auto Confirm.

## Files
- `src/lib/schema.ts` — shape of every content type (used by build, preview and publish).
- `src/views/` — page templates, fed either published content (`src/pages/`) or drafts (`src/pages/preview/`).
- `src/layouts/Base.astro` — public `<head>` + menu; `AdminLayout.astro` — dashboard shell with sidebar.
- `src/middleware.ts` — admin gate (verifies the login locally, caches the admin check 5 min).
- `src/styles/global.css` (tokens in `:root`), `src/styles/admin.css`.
- `scripts/export-seed.mjs` — one-off that generated the initial Supabase content (`supabase/setup.sql`, not committed).

Commands: `npm run dev` (localhost:4321), `npm run build`, `npx astro check`.

## Design system (honor these — house standards)
- Palette (tokens): bg `#0D0D0F`, surface `#131316`, inset `#0A0A0C`, borders `#1F1F22`/`#26262A`,
  text `#F5F5F0` → `#9A9A94` → `#6B6B66` → `#3A3A3D`, green `#1B5E4A`, mint `#6EE7B7`, on-green `#ECFDF5`.
  No pure black.
- Radii: cards 16px, inner 12px, pills 999px. Spacing in multiples of 4 (4/8/12/16/24).
- Type weights minimal: DM Sans Regular for body/labels, SemiBold for section titles, Bebas only for display headers.
- Cards: content hugs, nothing truncated/clipped, clean previews. Rows keep equal heights.
- Committed dark theme (single visual world) — paint backgrounds explicitly.

## Known placeholders to replace with real detail (all editable in the dashboard)
- Case-study copy and stats for every project; hero images, screens and covers are empty.
- Contact email `hello@omoakins.com`, social links (`#`), book-a-call link, About portrait, Home stats.
- Draft placeholders: 3 testimonials, a sample blog post, a sample Services landing page.
