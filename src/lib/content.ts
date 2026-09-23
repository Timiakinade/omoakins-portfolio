/* Published content for the static site build. Preview pages build the same shapes
   from drafts instead (see lib/preview.ts). */
import { getCollection, getEntry } from "astro:content";
import { marked } from "marked";
import type { Page, Post, Project, Site, Testimonial } from "./schema";

export type { Page, Post, Project, Site, Testimonial } from "./schema";

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;
const byDate = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();
const plain = <T>({ id, data }: { id: string; data: T }) => ({ id, data });

export async function getSite(): Promise<Site> {
  const entry = await getEntry("settings", "site");
  if (!entry) throw new Error('Site settings are missing: publish "Site settings" in the dashboard.');
  return entry.data;
}

export const getProjects = async (): Promise<Project[]> => (await getCollection("projects")).map(plain).sort(byOrder);
export const getPosts = async (): Promise<Post[]> => (await getCollection("posts")).map(plain).sort(byDate);
export const getTestimonials = async (): Promise<Testimonial[]> => (await getCollection("testimonials")).map(plain).sort(byOrder);
export const getPages = async (): Promise<Page[]> => (await getCollection("pages")).map(plain);

export { byOrder, byDate };

// Landing pages live at the site root (/services), so they can't take a built-in page's address.
export const RESERVED_SLUGS = ["work", "blog", "about", "contact", "og", "admin", "preview", "api", "404", "sitemap-index", "sitemap-0", "robots"];

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export const markdown = (md: string) => marked.parse(md, { async: false }) as string;

// First part of a name like "Providus Bank — Redesign".
export const shortName = (name: string) => name.split(" — ")[0];
