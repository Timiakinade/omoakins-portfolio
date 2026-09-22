/* Content model for the Omoakins portfolio.
   Every collection here maps to something Timi will edit in the dashboard (phase 2),
   so field names are written for humans, not for the templates. */
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

// Optional per-page overrides for Google results and link previews.
const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(), // custom share image; otherwise one is generated
  })
  .optional();

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    category: z.string(), // must match one of site.categories for filters to catch it
    sector: z.string(), // e.g. "Finance" — the small pill on the tile
    year: z.string(),
    order: z.number(), // position on Home / Work (1 = first)
    featured: z.boolean().default(false), // wide tile on Home
    highlight: z.boolean().default(false), // green tile
    live: z.boolean().default(false), // "Live" pill instead of the year
    wordmark: z.string().optional(), // text shown on a highlighted tile
    summary: z.string(),
    role: z.string(),
    client: z.string(),
    timeline: z.string(),
    deliverables: z.string(),
    tools: z.string(),
    overview: z.string(),
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
    stat: z.object({ value: z.string(), caption: z.string() }),
    // Abstract tile preview used until a real cover image exists.
    preview: z.enum(["dashboard", "wordmark", "play", "phones", "split", "grid", "web"]).default("dashboard"),
    cover: z.string().optional(), // tile image
    heroImage: z.string().optional(), // big image at the top of the case study
    screens: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    seo,
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    seo,
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: file("./src/content/testimonials.json"),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(), // e.g. "Head of Marketing, Acme"
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

/* Landing pages: a stack of sections Timi can add, remove and reorder. */
const link = z.object({ label: z.string(), href: z.string() });
const section = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    eyebrow: z.string().optional(),
    headline: z.array(z.string()), // one entry per line
    intro: z.string().optional(),
    button: link.optional(),
  }),
  z.object({
    type: z.literal("text"),
    label: z.string().optional(),
    body: z.array(z.string()), // one entry per paragraph
  }),
  z.object({
    type: z.literal("image"),
    src: z.string().optional(),
    alt: z.string().default(""),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("stats"),
    items: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string(),
    source: z.string().optional(),
  }),
  z.object({
    type: z.literal("projects"),
    label: z.string().optional(),
    projects: z.array(z.string()).default([]), // project slugs; empty = all
  }),
  z.object({
    type: z.literal("cta"),
    headline: z.string(),
    button: link,
  }),
]);

const pages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sections: z.array(section),
    seo,
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts, testimonials, pages };
