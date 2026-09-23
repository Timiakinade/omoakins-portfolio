/* What the dashboard's editor shows for each kind of content: labels and help text
   written for Timi, mapped onto the fields in lib/schema.ts. */
import { PREVIEWS, type EntryType } from "../lib/schema";

interface Base { label: string; help?: string }
export type Field =
  | (Base & { kind: "text" | "textarea" | "markdown" | "date" | "url"; key: string; optional?: boolean; placeholder?: string })
  | (Base & { kind: "number"; key: string })
  | (Base & { kind: "boolean"; key: string })
  | (Base & { kind: "select"; key: string; options: readonly string[] | "categories" })
  | (Base & { kind: "lines"; key: string; paragraphs?: boolean }) // string[]: one per line (or per paragraph)
  | (Base & { kind: "image"; key: string })
  | (Base & { kind: "group"; key: string; fields: Field[] }) // nested object
  | (Base & { kind: "fieldset"; fields: Field[] }) // visual grouping only
  | (Base & { kind: "list"; key: string; item: string; fields: Field[]; blank: () => Record<string, unknown> })
  | (Base & { kind: "sections"; key: string })
  | (Base & { kind: "projects"; key: string }); // pick projects by name

const seo: Field = {
  kind: "group",
  key: "seo",
  label: "Google & link previews (optional)",
  help: "Leave empty to use the title, summary and a generated preview image.",
  fields: [
    { kind: "text", key: "title", label: "Title in Google / link previews", optional: true },
    { kind: "textarea", key: "description", label: "Description in Google / link previews", optional: true },
    { kind: "image", key: "image", label: "Custom share image (1200 × 630)" },
  ],
};

const button = (label: string, optional = false): Field => ({
  kind: "group",
  key: "button",
  label,
  help: optional ? "Leave the text empty for no button." : undefined,
  fields: [
    { kind: "text", key: "label", label: "Button text" },
    { kind: "url", key: "href", label: "Button link", help: "A page on the site like /contact, or a full web address." },
  ],
});

export const SECTION_TYPES = {
  hero: {
    label: "Hero (big headline)",
    fields: [
      { kind: "text", key: "eyebrow", label: "Small label above", optional: true },
      { kind: "lines", key: "headline", label: "Headline", help: "Each line of text becomes its own line on the page." },
      { kind: "textarea", key: "intro", label: "Intro", optional: true },
      button("Button", true),
    ],
    blank: () => ({ type: "hero", headline: [""], intro: "", button: { label: "", href: "/contact" } }),
  },
  text: {
    label: "Text",
    fields: [
      { kind: "text", key: "label", label: "Small heading", optional: true },
      { kind: "lines", key: "body", label: "Text", paragraphs: true, help: "Leave an empty line between paragraphs." },
    ],
    blank: () => ({ type: "text", label: "", body: [""] }),
  },
  image: {
    label: "Image",
    fields: [
      { kind: "image", key: "src", label: "Image" },
      { kind: "text", key: "alt", label: "Describe the image", help: "Read aloud to people who can't see it." },
      { kind: "text", key: "caption", label: "Caption", optional: true },
    ],
    blank: () => ({ type: "image", alt: "" }),
  },
  stats: {
    label: "Numbers",
    fields: [
      {
        kind: "list", key: "items", item: "number", label: "Numbers",
        fields: [
          { kind: "text", key: "value", label: "Number", placeholder: "30+" },
          { kind: "text", key: "label", label: "Label", placeholder: "Projects" },
        ],
        blank: () => ({ value: "", label: "" }),
      },
    ],
    blank: () => ({ type: "stats", items: [{ value: "", label: "" }] }),
  },
  quote: {
    label: "Quote",
    fields: [
      { kind: "textarea", key: "text", label: "Quote" },
      { kind: "text", key: "source", label: "Who said it", optional: true },
    ],
    blank: () => ({ type: "quote", text: "" }),
  },
  projects: {
    label: "Projects",
    fields: [
      { kind: "text", key: "label", label: "Small heading", optional: true },
      { kind: "projects", key: "projects", label: "Which projects", help: "Pick none to show all of them." },
    ],
    blank: () => ({ type: "projects", label: "", projects: [] }),
  },
  cta: {
    label: "Call to action (green bar)",
    fields: [{ kind: "text", key: "headline", label: "Headline" }, button("Button")],
    blank: () => ({ type: "cta", headline: "Let's work together →", button: { label: "Start a project", href: "/contact" } }),
  },
} satisfies Record<string, { label: string; fields: Field[]; blank: () => Record<string, unknown> }>;

export const FIELDS: Record<EntryType, Field[]> = {
  project: [
    {
      kind: "fieldset", label: "Basics", fields: [
        { kind: "text", key: "name", label: "Project name" },
        { kind: "textarea", key: "summary", label: "One-line summary", help: "Shown on the wide Home tile and in link previews." },
        { kind: "select", key: "category", label: "Category", options: "categories", help: "Decides which filter shows it." },
        { kind: "text", key: "sector", label: "Sector", help: "The small pill on the tile, e.g. Finance." },
        { kind: "text", key: "year", label: "Year", placeholder: "2026" },
        { kind: "number", key: "order", label: "Position", help: "1 shows first on Home and Work." },
      ],
    },
    {
      kind: "fieldset", label: "Tile", fields: [
        { kind: "image", key: "cover", label: "Cover image", help: "Shown on the tile. Without one, a simple drawing is used." },
        { kind: "select", key: "preview", label: "Drawing (when there's no cover image)", options: PREVIEWS },
        { kind: "boolean", key: "featured", label: "Wide tile on Home", help: "Only applies when it's in position 1." },
        { kind: "boolean", key: "highlight", label: "Green tile" },
        { kind: "text", key: "wordmark", label: "Big word on the green tile", optional: true },
        { kind: "boolean", key: "live", label: "Show a “Live” pill instead of the year" },
      ],
    },
    {
      kind: "fieldset", label: "Case study", fields: [
        { kind: "text", key: "role", label: "Role" },
        { kind: "text", key: "client", label: "Client" },
        { kind: "text", key: "timeline", label: "Timeline", placeholder: "6 weeks" },
        { kind: "text", key: "deliverables", label: "Deliverables" },
        { kind: "text", key: "tools", label: "Tools" },
        { kind: "image", key: "heroImage", label: "Big image at the top" },
        { kind: "textarea", key: "overview", label: "Overview" },
        { kind: "textarea", key: "challenge", label: "The challenge" },
        { kind: "textarea", key: "approach", label: "The approach" },
        {
          kind: "list", key: "screens", item: "screen", label: "Screens",
          help: "2–3 key screens, shown after the approach.",
          fields: [
            { kind: "image", key: "src", label: "Image" },
            { kind: "text", key: "alt", label: "Describe the screen" },
          ],
          blank: () => ({ src: "", alt: "" }),
        },
        { kind: "textarea", key: "outcome", label: "Outcome" },
        {
          kind: "group", key: "stat", label: "Headline number", fields: [
            { kind: "text", key: "value", label: "Number", placeholder: "3" },
            { kind: "text", key: "caption", label: "What it means", placeholder: "Taps to move money" },
          ],
        },
      ],
    },
    seo,
  ],
  post: [
    { kind: "text", key: "title", label: "Title" },
    { kind: "textarea", key: "description", label: "Summary", help: "Shown on the blog list and in link previews." },
    { kind: "date", key: "date", label: "Date" },
    { kind: "lines", key: "tags", label: "Tags", help: "One per line." },
    { kind: "image", key: "cover", label: "Cover image" },
    {
      kind: "markdown", key: "body", label: "Post",
      help: "## for a heading, **bold**, *italic*, - for a list, > for a quote, [text](link) for a link. Use “Add image” to put a picture in.",
    },
    seo,
  ],
  page: [
    { kind: "text", key: "title", label: "Page title" },
    { kind: "textarea", key: "description", label: "Summary", help: "Used in Google and link previews." },
    { kind: "sections", key: "sections", label: "Sections" },
    seo,
  ],
  testimonial: [
    { kind: "textarea", key: "quote", label: "Quote" },
    { kind: "text", key: "name", label: "Name" },
    { kind: "text", key: "role", label: "Role and company", placeholder: "Head of Marketing, Acme" },
    { kind: "number", key: "order", label: "Position", help: "1 shows first." },
  ],
  settings: [
    {
      kind: "fieldset", label: "Everywhere", fields: [
        { kind: "text", key: "name", label: "Site name" },
        { kind: "text", key: "person", label: "Your first name" },
        { kind: "text", key: "title", label: "Browser tab / Google title for the home page" },
        { kind: "textarea", key: "description", label: "Google description for the home page" },
        { kind: "text", key: "tagline", label: "Tagline (used on the home share image)" },
        { kind: "text", key: "email", label: "Contact email" },
        { kind: "url", key: "callLink", label: "Book-a-call link", help: "e.g. your Calendly link." },
        {
          kind: "list", key: "socials", item: "link", label: "Social links",
          fields: [
            { kind: "text", key: "label", label: "Name", placeholder: "LinkedIn" },
            { kind: "url", key: "href", label: "Link" },
          ],
          blank: () => ({ label: "", href: "" }),
        },
        { kind: "lines", key: "categories", label: "Work categories", help: "One per line. Each project picks one; the Work page filters by them." },
      ],
    },
    {
      kind: "group", key: "home", label: "Home page", fields: [
        { kind: "text", key: "availability", label: "Availability line" },
        { kind: "lines", key: "headline", label: "Headline", help: "Each line of text becomes its own line." },
        { kind: "textarea", key: "intro", label: "Intro" },
        {
          kind: "list", key: "stats", item: "number", label: "Numbers beside the headline",
          fields: [
            { kind: "text", key: "value", label: "Number", placeholder: "5+" },
            { kind: "text", key: "label", label: "Label", placeholder: "Years" },
          ],
          blank: () => ({ value: "", label: "" }),
        },
        { kind: "lines", key: "filters", label: "Filter buttons", help: "One per line, matching the work categories." },
        { kind: "text", key: "testimonialsLabel", label: "Testimonials heading" },
        { kind: "text", key: "bandQuestion", label: "Footer question" },
        { kind: "text", key: "bandButton", label: "Footer button text" },
      ],
    },
    {
      kind: "group", key: "work", label: "Work page", fields: [
        { kind: "text", key: "heading", label: "Heading" },
        { kind: "text", key: "years", label: "Years shown", placeholder: "2021—2026" },
      ],
    },
    {
      kind: "group", key: "blog", label: "Blog page", fields: [
        { kind: "text", key: "heading", label: "Heading" },
        { kind: "textarea", key: "intro", label: "Intro" },
      ],
    },
    {
      kind: "group", key: "about", label: "About page", fields: [
        { kind: "text", key: "kicker", label: "Small label" },
        { kind: "lines", key: "headline", label: "Headline", help: "Each line of text becomes its own line." },
        { kind: "image", key: "portrait", label: "Portrait" },
        { kind: "textarea", key: "lead", label: "First paragraph" },
        { kind: "textarea", key: "body", label: "Second paragraph" },
        { kind: "lines", key: "whatIDo", label: "What I do", help: "One per line." },
        { kind: "lines", key: "whereIWork", label: "Where I work", help: "One per line." },
        { kind: "lines", key: "workedAcross", label: "Worked across (big words)", help: "One per line." },
        { kind: "textarea", key: "quote", label: "Quote" },
        { kind: "text", key: "quoteSource", label: "Quote source" },
        { kind: "text", key: "ctaHeadline", label: "Green bar headline" },
        { kind: "text", key: "ctaButton", label: "Green bar button" },
      ],
    },
    {
      kind: "group", key: "contact", label: "Contact page", fields: [
        { kind: "text", key: "availability", label: "Availability line" },
        { kind: "lines", key: "headline", label: "Headline", help: "Each line of text becomes its own line." },
        { kind: "textarea", key: "pitch", label: "Intro" },
        { kind: "text", key: "callLabel", label: "Book-a-call link text" },
        { kind: "lines", key: "projectTypes", label: "Project types on the form", help: "One per line." },
      ],
    },
  ],
};

export const TYPE_LABELS: Record<EntryType, { one: string; many: string }> = {
  settings: { one: "Site settings", many: "Site settings" },
  project: { one: "Project", many: "Projects" },
  post: { one: "Blog post", many: "Blog posts" },
  page: { one: "Landing page", many: "Landing pages" },
  testimonial: { one: "Testimonial", many: "Testimonials" },
};

/** Public address of an item, once published. */
export function publicPath(type: EntryType, slug: string) {
  return { project: `/work/${slug}`, post: `/blog/${slug}`, page: `/${slug}`, testimonial: "/", settings: "/" }[type];
}

/** Human title for lists. */
export function itemTitle(type: EntryType, d: Record<string, any>) {
  if (type === "settings") return "Site settings";
  if (type === "testimonial") return `${d.name || "Unnamed"} — “${String(d.quote ?? "").slice(0, 60)}${String(d.quote ?? "").length > 60 ? "…" : ""}”`;
  return d.name || d.title || "Untitled";
}
