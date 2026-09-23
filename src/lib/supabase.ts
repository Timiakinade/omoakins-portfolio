/* Supabase connection details. Both values are public by design: the publishable key
   only allows what the database's row-level security rules allow (reading published content). */
export const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL ?? "https://sqffpsyywzgxkjkjwlue.supabase.co";
export const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_V444eN8uQOl0okK-wyNPQA_QK0HudfZ";

export interface EntryRow {
  id: string;
  type: string;
  slug: string;
  draft: Record<string, unknown>;
  published: Record<string, unknown> | null;
  published_at: string | null;
  updated_at: string;
}

/** Published rows of one type, read with the public key (used by the site build). */
export async function fetchPublished(type: string): Promise<{ slug: string; published: Record<string, unknown> }[]> {
  const url = `${SUPABASE_URL}/rest/v1/entries?select=slug,published&type=eq.${type}&published=not.is.null`;
  const res = await fetch(url, { headers: { apikey: SUPABASE_KEY } });
  if (!res.ok) throw new Error(`Couldn't load ${type} content from Supabase (${res.status}): ${await res.text()}`);
  return res.json();
}
