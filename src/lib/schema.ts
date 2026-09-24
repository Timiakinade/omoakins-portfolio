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

/* Case-study body: a list of sections Timi can add, remove, reorder and rename. */
const labelled = z.object({ label: z.string(), value: z.string() });
export const caseSectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"), // heading + paragraphs, optional small side column (e.g. Deliverables / Tools)
    heading: z.string(),
    body: z.array(z.string()),
    side: z.array(labelled).default([]),
  }),
  z.object({
    type: z.literal("cards"), // boxes side by side (e.g. The challenge / The approach)
    cards: z.array(z.object({ heading: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal("images"), // a row of screens; shows a placeholder until images are added
    heading: z.string().optional(),
    // Slots without a picture yet are allowed; they just don't show.
    images: z.array(z.object({ src: z.string().optional(), alt: z.string().default(""), caption: z.string().optional() })).default([]),
  }),
  z.object({
    type: z.literal("number"), // text beside a big green number (e.g. Outcome)
    heading: z.string(),
    text: z.string(),
    value: z.string(),
    caption: z.string(),
  }),
]);

/** Projects saved before case studies became flexible: turn the fixed fields into sections. */
function upgradeProject(v: unknown) {
  if (!v || typeof v !== "object" || "sections" in v) return v;
  const { role, client, timeline, deliverables, tools, overview, challenge, approach, outcome, stat, screens, ...rest } =
    v as Record<string, any>;
  return {
    ...rest,
    facts: [
      { label: "Role", value: role ?? "" },
      { label: "Client", value: client ?? "" },
      { label: "Year", value: rest.year ?? "" },
      { label: "Timeline", value: timeline ?? "" },
    ],
    sections: [
      {
        type: "text", heading: "Overview", body: [overview ?? ""],
        side: [{ label: "Deliverables", value: deliverables ?? "" }, { label: "Tools", value: tools ?? "" }],
      },
      { type: "cards", cards: [{ heading: "The challenge", text: challenge ?? "" }, { heading: "The approach", text: approach ?? "" }] },
      { type: "images", images: screens ?? [] },
      { type: "number", heading: "Outcome", text: outcome ?? "", value: stat?.value ?? "", caption: stat?.caption ?? "" },
    ],
  };
}

export const projectSchema = z.preprocess(
  upgradeProject,
  z.object({
    name: required("Name"),
    category: z.string(), // must match one of site.categories for filters to catch it
    sector: z.string(), // e.g. "Finance" — the small pill on the tile
    year: z.string(), // shown on the tile
    order: z.number(), // position on Home / Work (1 = first)
    featured: z.boolean().default(false), // wide tile on Home
    highlight: z.boolean().default(false), // green tile
    live: z.boolean().default(false), // "Live" pill instead of the year
    wordmark: z.string().optional(), // text shown on a highlighted tile
    summary: z.string(),
    // Abstract tile preview used until a real cover image exists.
    preview: z.enum(PREVIEWS).default("dashboard"),
    cover: z.string().optional(), // tile image
    facts: z.array(labelled), // the row under the title: Role, Client, Year…
    heroImage: z.string().optional(), // big image at the top of the case study
    sections: z.array(caseSectionSchema),
    seo,
  }),
);

/** A project in the current shape (used by the dashboard before editing an older project). */
export const upgradeProjectData = (v: Record<string, unknown>) => upgradeProject(v) as Record<string, unknown>;

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

/** Plain-language version of a validation problem, e.g. "Section 3, image 1: …". */
export function describeIssue(issue: { path: PropertyKey[]; message: string }) {
  const words: Record<string, string> = {
    sections: "Section", images: "image", cards: "card", facts: "fact", side: "detail", items: "number",
    screens: "screen", socials: "social link", nav: "menu link", stats: "number",
  };
  const parts: string[] = [];
  const path = issue.path;
  for (let i = 0; i < path.length; i++) {
    const key = String(path[i]);
    const next = path[i + 1];
    if (typeof next === "number" && words[key]) {
      parts.push(`${words[key]} ${next + 1}`);
      i++;
    } else parts.push(key.replace(/([A-Z])/g, " $1").toLowerCase());
  }
  const where = parts.join(", ");
  const what = /received undefined/.test(issue.message) ? "is missing" : issue.message;
  return `${where ? where.charAt(0).toUpperCase() + where.slice(1) : "This item"}: ${what}`;
}

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
