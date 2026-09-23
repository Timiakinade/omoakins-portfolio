/* Live / draft status of an item, as shown in lists and the editor. */
export type Status = { cls: "live" | "changed" | "draft"; text: string };

export function status(draft: unknown, published: unknown | null): Status {
  if (published === null || published === undefined) return { cls: "draft", text: "Draft · not live" };
  if (JSON.stringify(published) === JSON.stringify(draft)) return { cls: "live", text: "Live" };
  return { cls: "changed", text: "Live · changes not published" };
}

/** Just the given top-level parts of an object (used for Site settings screens). */
export function pick(obj: Record<string, unknown> | null, keys?: string[]) {
  if (!obj || !keys) return obj;
  return Object.fromEntries(keys.map((k) => [k, obj[k]]));
}
