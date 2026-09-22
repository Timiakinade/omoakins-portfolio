import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Absolute site URL, used for canonical links, share previews and the sitemap.
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; SITE_URL overrides it (e.g. a custom domain).
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:4321");

export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: [sitemap()],
});
