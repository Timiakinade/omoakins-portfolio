/* Called once a day by Vercel Cron (vercel.json) so Supabase's free plan never pauses for inactivity. */
export const prerender = false;
import type { APIRoute } from "astro";
import { fetchPublished } from "../../lib/supabase";

export const GET: APIRoute = async () => {
  try {
    await fetchPublished("settings");
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 502 });
  }
};
