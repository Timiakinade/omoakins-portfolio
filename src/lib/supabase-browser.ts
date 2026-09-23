/* Supabase client for dashboard pages in the browser. Its session lives in cookies,
   so the server (middleware.ts) sees the same login. */
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL } from "./supabase";

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
