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
Astro (static output) on Vercel; code in GitHub `Timiakinade/omoakins-portfolio`. Node lives at
`~/.local/node/bin` on Timi's Mac (not on PATH — prefix commands with `export PATH=$HOME/.local/node/bin:$PATH`).
Fonts: Bebas Neue (display), DM Sans (body), Space Mono (mono labels) via Google Fonts;
`@fontsource` copies are used only to draw share images.

Roadmap (Timi edits with no code): phase 1 = this Astro site; phase 2 = admin dashboard
(Supabase for login/database/images, draft → preview → publish); phase 3 = messages inbox + analytics.

## Files
- `src/content/` — **all content**. The dashboard (phase 2) will edit these same shapes.
  - `projects/<slug>.json` — one per case study (drives Home tile, Work tile, `/work/<slug>`).
  - `posts/<slug>.md` — blog posts (`/blog/<slug>`).
  - `pages/<slug>.json` — landing pages made of sections (`/<slug>`).
  - `testimonials.json` — Home testimonials, shown before the footer band.
  - `site.json` — all other page copy: hero, stats, About, Contact, socials, categories.
- `src/content.config.ts` — the schema for every collection (field names + meaning).
- `src/pages/` — routes. `og/[...path].png.ts` generates a share image per page (`src/lib/og.ts`).
- `src/layouts/Base.astro` — `<head>` (title, description, canonical, share tags) + nav.
- `src/components/` — Tile, Preview, Testimonials, Band, Eyebrow.
- `src/styles/global.css` — all CSS. Design tokens are CSS variables in `:root` at the top.
- `src/scripts/site.ts` — menu, filters, scroll reveal, contact form stub.

Drafts: any item with `"draft": true` shows locally and on Vercel preview links, never on the live site.
Old `#case/<id>` / `#work` links redirect to the real pages (inline script in `Base.astro`).

Commands: `npm run dev` (localhost:4321), `npm run build` (→ `dist/`), `npx astro check`.

## Design system (honor these — house standards)
- Palette (tokens): bg `#0D0D0F`, surface `#131316`, inset `#0A0A0C`, borders `#1F1F22`/`#26262A`,
  text `#F5F5F0` → `#9A9A94` → `#6B6B66` → `#3A3A3D`, green `#1B5E4A`, mint `#6EE7B7`, on-green `#ECFDF5`.
  No pure black.
- Radii: cards 16px, inner 12px, pills 999px. Spacing in multiples of 4 (4/8/12/16/24).
- Type weights minimal: DM Sans Regular for body/labels, SemiBold for section titles, Bebas only for display headers.
- Cards: content hugs, nothing truncated/clipped, clean previews. Rows keep equal heights.
- Committed dark theme (single visual world) — paint backgrounds explicitly.

## Known placeholders to replace with real detail
- Case-study `overview` / `challenge` / `approach` / `outcome` / `stat` in `src/content/projects/*.json`.
- Hero visuals + screens (`heroImage`, `screens`, `cover` fields are empty → placeholder blocks).
- `site.json`: email `hello@omoakins.com`, social links (`#`), `callLink`, `about.portrait`, hero stats.
- Draft placeholders: `testimonials.json` (3), `posts/sample-post.md`, `pages/services.json`.

## Reasonable next steps
- Connect Vercel to the repo, then turn off GitHub Pages (Settings → Pages).
- Swap placeholder case-study copy with Timi's real projects (Providus, Faith, LG, Livestock strongest first).
- Phase 2: the dashboard. Phase 3: contact form → inbox, analytics.
