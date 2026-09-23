/* Supabase client for on-demand pages, signed in as whoever's session cookie came with the request. */
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";
import { SUPABASE_KEY, SUPABASE_URL } from "./supabase";

export function serverClient(request: Request, cookies: AstroCookies) {
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () =>
        parseCookieHeader(request.headers.get("cookie") ?? "").map(({ name, value }) => ({ name, value: value ?? "" })),
      setAll: (list) => list.forEach(({ name, value, options }) => cookies.set(name, value, options)),
    },
  });
}
