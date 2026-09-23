/* Asks Vercel to rebuild the live site. The hook URL is a secret set in Vercel
   (Project → Settings → Environment Variables → DEPLOY_HOOK_URL). */
export async function rebuildSite(): Promise<"started" | "not-configured" | "failed"> {
  const hook = process.env.DEPLOY_HOOK_URL ?? import.meta.env.DEPLOY_HOOK_URL;
  if (!hook) return "not-configured";
  try {
    const res = await fetch(hook, { method: "POST" });
    return res.ok ? "started" : "failed";
  } catch {
    return "failed";
  }
}
