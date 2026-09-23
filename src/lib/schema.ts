/* The shape of every kind of content. Used by the site build, the preview pages
   and the dashboard's Publish check, so all three agree on what's valid. */
import { z } from "astro/zod";

const required = (label: string) => z.string().trim().min(1, `${label} can't be empty`);

// Optional per-page overrides for Google results and link previews.
const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(), // custom share image; otherwise one is generated
  })
  .optional();

export const PREVIEWS = ["dashboard", "wordmark", "play", "phones", "split", "grid", "web"] as const;

export const projectSchema = z.object({
  name: required("Name"),
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
  preview: z.enum(PREVIEWS).default("dashboard"),
  cover: z.string().optional(), // tile image
  heroImage: z.string().optional(), // big image at the top of the case study
  screens: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  seo,
});

export const postSchema = z.object({
  title: required("Title"),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  body: z.string(), // Markdown
  seo,
});

export const testimonialSchema = z.object({
  quote: required("Quote"),
  name: required("Name"),
  role: z.string(), // e.g. "Head of Marketing, Acme"
  order: z.number(),
});

/* Landing pages: a stack of sections Timi can add, remove and reorder. */
const link = z.object({ label: z.string(), href: z.string() });
export const sectionSchema = z.discriminatedUnion("type", [
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

export const pageSchema = z.object({
  title: required("Title"),
  description: z.string(),
  sections: z.array(sectionSchema),
  seo,
});

const label = z.object({ value: z.string(), label: z.string() });

export const HOME_SECTIONS = ["intro", "work", "testimonials", "footer"] as const;
const DEFAULT_NAV = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const siteSchema = z.object({
  name: z.string(),
  person: z.string(),
  title: z.string(),
  description: z.string(),
  tagline: z.string(),
  email: z.string(),
  callLink: z.string(),
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
  categories: z.array(z.string()),
  // Top menu, left to right. A /blog link only shows once a post is published.
  nav: z.array(z.object({ label: z.string(), href: z.string() })).default(DEFAULT_NAV),
  navButton: z.object({ label: z.string(), href: z.string() }).default({ label: "Book a call", href: "/contact" }),
  home: z.object({
    // Home page sections, top to bottom; `show: false` hides one.
    layout: z
      .array(z.object({ section: z.enum(HOME_SECTIONS), show: z.boolean() }))
      .default(HOME_SECTIONS.map((section) => ({ section, show: true }))),
    availability: z.string(),
    headline: z.array(z.string()),
    intro: z.string(),
    stats: z.array(label),
    filters: z.array(z.string()),
    testimonialsLabel: z.string(),
    bandQuestion: z.string(),
    bandButton: z.string(),
  }),
  work: z.object({ heading: z.string(), years: z.string() }),
  blog: z.object({ heading: z.string(), intro: z.string() }),
  about: z.object({
    kicker: z.string(),
    headline: z.array(z.string()),
    portrait: z.string(),
    lead: z.string(),
    body: z.string(),
    whatIDo: z.array(z.string()),
    whereIWork: z.array(z.string()),
    workedAcross: z.array(z.string()),
    quote: z.string(),
    quoteSource: z.string(),
    ctaHeadline: z.string(),
    ctaButton: z.string(),
  }),
  contact: z.object({
    availability: z.string(),
    headline: z.array(z.string()),
    pitch: z.string(),
    callLabel: z.string(),
    projectTypes: z.array(z.string()),
  }),
});

export const schemas = {
  project: projectSchema,
  post: postSchema,
  page: pageSchema,
  testimonial: testimonialSchema,
  settings: siteSchema,
} as const;
export type EntryType = keyof typeof schemas;
export const ENTRY_TYPES = Object.keys(schemas) as EntryType[];

export type ProjectData = z.infer<typeof projectSchema>;
export type PostData = z.infer<typeof postSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type TestimonialData = z.infer<typeof testimonialSchema>;
export type Site = z.infer<typeof siteSchema>;

// Every item the templates see: its address (slug) plus its content.
export interface Item<T> { id: string; data: T }
export type Project = Item<ProjectData>;
export type Post = Item<PostData>;
export type Page = Item<PageData>;
export type Testimonial = Item<TestimonialData>;
