# Omoakins portfolio

Next.js on Vercel, Supabase behind it (optional until the admin is built).
Every feature is taken from a site Timi picked, measured off the live DOM.
Full spec: the claude.ai project doc "timi-picks-measured".

| Feature | From |
|---|---|
| Home header: Figma canvas frame, cursor, status | Tariq |
| Buttons: staggered colour wipe | Tariq |
| Bottom dock nav | Tariq |
| Footer: "Let's talk", copy email pill | Tariq, with Aliyu's link row |
| Page section rail with dots (home) | Iyanu |
| FAQ with topic tabs | Iyanu |
| Case study hero, 3px progress line, prototype box | Iyanu |
| Case study chapter sidebar, next project, pinned gallery | Aliyu |
| Cards revealing on scroll, About and Contact layouts | Aliyu |
| Selected work cards, filter, per study theme | Tsolaye |

## Run locally

    npm install
    npm run dev

## Where things live

| What | File |
|---|---|
| Case studies | `lib/content/case-studies.js` |
| Site text, hero, FAQ, About, socials | `lib/content/settings.js` |
| Block types | `lib/blocks.js`, rendered in `components/blocks/Blocks.js` |
| Tokens and layout | `app/globals.css` |

## Before launch (TODO markers in the content files)

- Email, resume, social URLs, portrait
- About copy, chapters, FAQ answers, toolkit: drafts to confirm
- UBA: 8 vs 10 testers, timeline, client or self initiated (badge)
- Providus and LG write ups, LG Behance link, Providus brand hex
- Real images: every empty `src` renders a sized placeholder
