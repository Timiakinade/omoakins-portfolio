// Data layer. Reads from Supabase when the env vars are set,
// otherwise falls back to the built in content so the site always runs.

import { createClient } from "@supabase/supabase-js";
import { caseStudies as seedStudies } from "./content/case-studies";
import { settings as seedSettings } from "./content/settings";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

const byOrder = (a, b) => (a.position ?? 0) - (b.position ?? 0);

export async function getSettings() {
  if (!supabase) return seedSettings;
  const { data, error } = await supabase.from("site_settings").select("data").eq("id", 1).maybeSingle();
  if (error || !data) return seedSettings;
  return { ...seedSettings, ...data.data };
}

export async function getCaseStudies() {
  if (!supabase) return seedStudies.filter((s) => s.status === "published").sort(byOrder);
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .order("position", { ascending: true });
  if (error || !data?.length) return seedStudies.filter((s) => s.status === "published").sort(byOrder);
  return data;
}

export async function getCaseStudy(slug) {
  const all = await getCaseStudies();
  const index = all.findIndex((s) => s.slug === slug);
  if (index === -1) return null;
  return { study: all[index], next: all[(index + 1) % all.length], total: all.length, index };
}
