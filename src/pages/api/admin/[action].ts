/* Dashboard actions that change the live site: publish, unpublish, delete.
   Each one rebuilds the site afterwards. Admin-only (see middleware.ts). */
export const prerender = false;
import type { APIRoute } from "astro";
import { rebuildSite } from "../../../lib/deploy";
import { RESERVED_SLUGS } from "../../../lib/content";
import { schemas, type EntryType } from "../../../lib/schema";

const fail = (error: string, status = 400) => Response.json({ error }, { status });

export const POST: APIRoute = async ({ params, request, locals }) => {
  const { type, slug } = (await request.json().catch(() => ({}))) as { type?: EntryType; slug?: string };
  if (!type || !slug || !(type in schemas)) return fail("Missing or unknown item.");
  const db = locals.supabase;
  const row = await db.from("entries").select("draft, published").eq("type", type).eq("slug", slug).maybeSingle();
  if (row.error) return fail(row.error.message, 500);
  if (!row.data) return fail("This item doesn't exist any more.", 404);

  switch (params.action) {
    case "publish": {
      if (type === "page" && RESERVED_SLUGS.includes(slug)) {
        return fail(`"/${slug}" is already used by the site. Create the page again with a different address.`);
      }
      const parsed = schemas[type].safeParse(row.data.draft);
      if (!parsed.success) {
        const problems = parsed.error.issues.map((i) => `${i.path.join(" › ") || "Item"}: ${i.message}`);
        return Response.json({ error: "Fix these before publishing:", problems }, { status: 422 });
      }
      const res = await db
        .from("entries")
        .update({ published: row.data.draft, published_at: new Date().toISOString() })
        .eq("type", type)
        .eq("slug", slug);
      if (res.error) return fail(res.error.message, 500);
      break;
    }
    case "unpublish": {
      if (type === "settings") return fail("Site settings can't be unpublished.");
      const res = await db.from("entries").update({ published: null, published_at: null }).eq("type", type).eq("slug", slug);
      if (res.error) return fail(res.error.message, 500);
      break;
    }
    case "delete": {
      if (type === "settings") return fail("Site settings can't be deleted.");
      const res = await db.from("entries").delete().eq("type", type).eq("slug", slug);
      if (res.error) return fail(res.error.message, 500);
      if (!row.data.published) return Response.json({ ok: true, rebuild: "not-needed" });
      break;
    }
    default:
      return fail("Unknown action.", 404);
  }
  return Response.json({ ok: true, rebuild: await rebuildSite() });
};
