import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";

// Absolute site URL, used for canonical links, share previews and the sitemap.
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; SITE_URL overrides it (e.g. a custom domain).
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:4321");

// Public pages are built ahead of time. The dashboard (/admin), previews (/preview) and
// /api run on demand on Vercel; they opt in with `export const prerender = false`.
export default defineConfig({
  site,
  trailingSlash: "never",
  adapter: vercel(),
  integrations: [
    preact(),
    sitemap({ filter: (page) => !/\/(admin|preview|api)(\/|$)/.test(new URL(page).pathname) }),
  ],
});
