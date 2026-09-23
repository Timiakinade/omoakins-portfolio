/* Content for the public site comes from Supabase (published versions only).
   Timi edits it in the dashboard at /admin; each Publish rebuilds the site. */
import { defineCollection } from "astro:content";
import type { Loader } from "astro/loaders";
import { fetchPublished } from "./lib/supabase";
import { pageSchema, postSchema, projectSchema, siteSchema, testimonialSchema } from "./lib/schema";

function supabase(type: string): Loader {
  return {
    name: `supabase-${type}`,
    async load({ store, parseData }) {
      const rows = await fetchPublished(type);
      store.clear();
      for (const row of rows) {
        store.set({ id: row.slug, data: await parseData({ id: row.slug, data: row.published }) });
      }
    },
  };
}

export const collections = {
  projects: defineCollection({ loader: supabase("project"), schema: projectSchema }),
  posts: defineCollection({ loader: supabase("post"), schema: postSchema }),
  pages: defineCollection({ loader: supabase("page"), schema: pageSchema }),
  testimonials: defineCollection({ loader: supabase("testimonial"), schema: testimonialSchema }),
  settings: defineCollection({ loader: supabase("settings"), schema: siteSchema }),
};
