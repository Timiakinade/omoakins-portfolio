/* Gatekeeper for the dashboard, previews and dashboard actions: Timi (an admin) only. */
import { defineMiddleware } from "astro:middleware";
import { serverClient } from "./lib/supabase-server";

const PROTECTED = /^\/(admin|preview|api\/admin)(\/|$)/;
const PUBLIC_ADMIN = ["/admin/login"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (context.isPrerendered || !PROTECTED.test(pathname) || PUBLIC_ADMIN.includes(pathname)) return next();

  const supabase = serverClient(context.request, context.cookies);
  const { data: { user } } = await supabase.auth.getUser();
  const { data: isAdmin } = user ? await supabase.rpc("is_admin") : { data: false };

  if (!user || !isAdmin) {
    if (pathname.startsWith("/api/")) return Response.json({ error: "Please log in again." }, { status: 401 });
    const denied = user ? "&denied=1" : ""; // logged in, but not an admin
    return context.redirect(`/admin/login?next=${encodeURIComponent(pathname + context.url.search)}${denied}`);
  }
  context.locals.supabase = supabase;
  context.locals.email = user.email ?? "";
  const res = await next();
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
});
