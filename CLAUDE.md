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
Plain HTML/CSS/JS. No framework, no build, no dependencies. Client-side hash routing.
Fonts: Bebas Neue (display), DM Sans (body), Space Mono (mono labels) via Google Fonts.

## Files
- `index.html` — markup shell: one nav + five `.view` sections (home, work, case, about, contact).
- `assets/css/styles.css` — all CSS. Design tokens are CSS variables in `:root` at the top.
- `assets/js/data.js` — `window.CATS` + `window.PROJECTS`. **Content lives here.**
- `assets/js/app.js` — renders tiles/case studies, hash routing, filters (with empty-state), contact form.

Routing: `#work`, `#about`, `#contact`, `#case/<id>`; home is default. `app.js` reads `location.hash`.

## Design system (honor these — house standards)
- Palette (tokens): bg `#0D0D0F`, surface `#131316`, inset `#0A0A0C`, borders `#1F1F22`/`#26262A`,
  text `#F5F5F0` → `#9A9A94` → `#6B6B66` → `#3A3A3D`, green `#1B5E4A`, mint `#6EE7B7`, on-green `#ECFDF5`.
  No pure black.
- Radii: cards 16px, inner 12px, pills 999px. Spacing in multiples of 4 (4/8/12/16/24).
- Type weights minimal: DM Sans Regular for body/labels, SemiBold for section titles, Bebas only for display headers.
- Cards: content hugs, nothing truncated/clipped, clean previews. Rows keep equal heights.
- Committed dark theme (single visual world) — paint backgrounds explicitly.

## Known placeholders to replace with real detail
- Case-study `overview` / `challenge` / `approach` / `outcome` and `statBig`/`statCap` in `data.js`.
- Hero visuals + screen blocks ("drop real screen here" / "screen sequence").
- Contact email `hello@omoakins.com`, social links, portrait image, hero stats (`5+`, `30+`, `20+ Clients`).

## Reasonable next steps
- Swap placeholder case-study copy with Timi's real projects (Providus, Faith, LG, Livestock strongest first).
- Add real project thumbnails/screens (replace the abstract `preview` blocks).
- Wire the contact form to a real endpoint (Formspree/Netlify Forms) — it's currently a front-end stub.
- Optional: add a build step only if you introduce tooling; today none is needed.
