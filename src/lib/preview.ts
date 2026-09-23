/* Content for preview pages: the live (published) site, with one item swapped for its draft. */
import type { SupabaseClient } from "@supabase/supabase-js";
import { byDate, byOrder } from "./content";
import { schemas, type EntryType, type Page, type Post, type Project, type Site, type Testimonial } from "./schema";
import type { EntryRow } from "./supabase";

export interface PreviewContent {
  site: Site | null;
  projects: Project[];
  posts: Post[];
  pages: Page[];
  testimonials: Testimonial[];
  problems: string[]; // why the previewed draft can't be shown, if it can't
}

export async function loadPreview(supabase: SupabaseClient, type: EntryType, slug: string): Promise<PreviewContent> {
  const { data, error } = await supabase.from("entries").select("type, slug, draft, published");
  if (error) throw error;

  const out: PreviewContent = { site: null, projects: [], posts: [], pages: [], testimonials: [], problems: [] };
  let found = false;
  for (const row of data as Pick<EntryRow, "type" | "slug" | "draft" | "published">[]) {
    const isTarget = row.type === type && row.slug === slug;
    const raw = isTarget ? row.draft : row.published;
    if (!raw) continue;
    found ||= isTarget;
    const parsed = schemas[row.type as EntryType]?.safeParse(raw);
    if (!parsed?.success) {
      if (isTarget) out.problems = parsed ? parsed.error.issues.map((i) => `${i.path.join(" › ") || "Item"}: ${i.message}`) : ["Unknown type"];
      continue;
    }
    const item = { id: row.slug, data: parsed.data } as never;
    if (row.type === "settings") out.site = parsed.data as Site;
    else if (row.type === "project") out.projects.push(item);
    else if (row.type === "post") out.posts.push(item);
    else if (row.type === "page") out.pages.push(item);
    else if (row.type === "testimonial") out.testimonials.push(item);
  }
  if (!found && !out.problems.length) out.problems = ["This item doesn't exist any more."];
  if (!out.site) out.problems.push("Site settings have never been published.");
  out.projects.sort(byOrder);
  out.testimonials.sort(byOrder);
  out.posts.sort(byDate);
  return out;
}
