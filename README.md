# Omoakins — Portfolio

Portfolio site for **Timi (Omoakin)** — a brand & product designer moving into product design.
Dark editorial theme, bento landing, filterable work, and case-study pages.

Static site. **No build step, no dependencies.** Plain HTML/CSS/JS — deploys anywhere.

## Structure

```
omoakins-portfolio/
├── index.html            # markup shell (nav + all 5 views)
├── assets/
│   ├── css/styles.css    # all styling + design tokens (CSS variables at top)
│   └── js/
│       ├── data.js       # ← EDIT THIS: projects + copy (the "content" file)
│       └── app.js        # rendering, routing, filters, form
├── CLAUDE.md             # context for Claude Code / contributors
└── .nojekyll             # lets GitHub Pages serve assets/ as-is
```

## Run locally

Just open `index.html` in a browser. Or serve it (nicer for routing):

```bash
python3 -m http.server 5173
# then visit http://localhost:5173
```

## Where to make changes

- **Add or edit a project** → `assets/js/data.js`. Each entry in `PROJECTS` drives the Home
  bento tile, the Work grid tile, and its Case Study page. `cat` must be one of `CATS`
  (`Product · UI`, `Brand`, `Marketing`) for the filters to catch it.
- **Colors / spacing / type** → the `:root` variables at the top of `assets/css/styles.css`.
- **Nav, hero, About, Contact copy** → the markup in `index.html`.

> Case-study prose and the stat tiles are **placeholder scaffolding** — replace with Timi's
> real project detail. Hero visuals are marked "drop real screen here".

## Deploy

### GitHub Pages (simplest — free)
1. Push this folder to a GitHub repo (see below).
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` → `/ (root)` → Save.
3. Live at `https://<username>.github.io/<repo>/` within ~1 minute.

### Netlify / Vercel (custom domain, instant)
- Drag the folder into Netlify, or "Import Git repository" in Vercel.
- Build command: **none**. Publish directory: **`/`** (root).

## First push to GitHub

```bash
cd omoakins-portfolio
git init
git add .
git commit -m "Omoakins portfolio — initial"
# create the repo (GitHub CLI):
gh repo create omoakins-portfolio --public --source=. --push
# …or add a remote you made in the GitHub UI:
# git remote add origin https://github.com/<username>/omoakins-portfolio.git
# git branch -M main && git push -u origin main
```
