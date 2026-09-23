/* Gatekeeper for the dashboard, previews and dashboard actions: Timi (an admin) only.
   Kept fast on purpose: the login token is verified locally (no call to Supabase), and a
   "yes, admin" answer is remembered for a few minutes. The database's own rules still
   refuse anyone who isn't an admin, whatever happens here. */
import { defineMiddleware } from "astro:middleware";
import { serverClient } from "./lib/supabase-server";

const PROTECTED = /^\/(admin|preview|api\/admin)(\/|$)/;
const PUBLIC_ADMIN = ["/admin/login"];

const ADMIN_TTL = 5 * 60 * 1000;
const adminCache = new Map<string, number>(); // user id -> remembered until (ms)

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (context.isPrerendered || !PROTECTED.test(pathname) || PUBLIC_ADMIN.includes(pathname)) return next();

  const supabase = serverClient(context.request, context.cookies);
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  let isAdmin = false;
  if (claims?.sub) {
    const until = adminCache.get(claims.sub);
    if (until && until > Date.now()) isAdmin = true;
    else {
      const { data: ok } = await supabase.rpc("is_admin");
      isAdmin = ok === true;
      if (isAdmin) adminCache.set(claims.sub, Date.now() + ADMIN_TTL);
      else adminCache.delete(claims.sub);
    }
  }

  if (!claims || !isAdmin) {
    if (pathname.startsWith("/api/")) return Response.json({ error: "Please log in again." }, { status: 401 });
    const denied = claims ? "&denied=1" : ""; // logged in, but not an admin
    return context.redirect(`/admin/login?next=${encodeURIComponent(pathname + context.url.search)}${denied}`);
  }
  context.locals.supabase = supabase;
  context.locals.email = String(claims.email ?? "");
  const res = await next();
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
});
