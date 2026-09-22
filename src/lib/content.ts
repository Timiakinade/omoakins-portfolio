import { getCollection, type CollectionEntry } from "astro:content";
import siteJson from "../content/site.json";

export const site = siteJson;

// Drafts show while working locally and on Vercel preview links, never on the live site.
export const SHOW_DRAFTS = import.meta.env.DEV || process.env.VERCEL_ENV === "preview";
const visible = (e: { data: { draft: boolean } }) => SHOW_DRAFTS || !e.data.draft;

export type Project = CollectionEntry<"projects">;
export type Post = CollectionEntry<"posts">;
export type Page = CollectionEntry<"pages">;

export async function getProjects() {
  return (await getCollection("projects", visible)).sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  return (await getCollection("posts", visible)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTestimonials() {
  return (await getCollection("testimonials", visible)).sort((a, b) => a.data.order - b.data.order);
}

// Landing pages live at the site root (/services), so they can't take a built-in page's address.
const RESERVED = new Set(["work", "blog", "about", "contact", "og", "404", "sitemap-index", "sitemap-0"]);

export async function getPages() {
  const pages = await getCollection("pages", visible);
  for (const p of pages) {
    if (RESERVED.has(p.id)) throw new Error(`Landing page "${p.id}" uses a reserved address; rename its file.`);
  }
  return pages;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// First part of a name like "Providus Bank — Redesign".
export const shortName = (name: string) => name.split(" — ")[0];
