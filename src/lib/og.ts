/* Share-preview images (1200×630) drawn from the design tokens at build time. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const font = (pkg: string, file: string) =>
  readFileSync(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

const fonts = [
  { name: "Bebas Neue", data: font("bebas-neue", "bebas-neue-latin-400-normal.woff"), weight: 400 as const },
  { name: "DM Sans", data: font("dm-sans", "dm-sans-latin-400-normal.woff"), weight: 400 as const },
  { name: "DM Sans", data: font("dm-sans", "dm-sans-latin-600-normal.woff"), weight: 600 as const },
  { name: "Space Mono", data: font("space-mono", "space-mono-latin-400-normal.woff"), weight: 400 as const },
];

const T = {
  bg: "#0D0D0F", surface: "#131316", line: "#1F1F22", ink: "#F5F5F0", body: "#9A9A94",
  muted: "#6B6B66", green: "#1B5E4A", mint: "#6EE7B7", mint2: "#A7F3D0", onGreen: "#ECFDF5",
};

export interface OgCard {
  eyebrow: string; // e.g. "Case study · Finance"
  title: string;
  description: string;
  action?: string; // e.g. "View case study →"
  highlight?: boolean; // green card
}

type Node = { type: string; props: Record<string, unknown> };
const h = (style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

export async function renderOg(card: OgCard): Promise<Buffer> {
  const g = card.highlight;
  const titleSize = card.title.length <= 16 ? 136 : card.title.length <= 28 ? 108 : 84;
  const mono = { fontFamily: "Space Mono", fontSize: 18, letterSpacing: 2.2, textTransform: "uppercase" };

  const tree = h(
    { width: 1200, height: 630, padding: 40, background: T.bg },
    h(
      {
        flex: 1, flexDirection: "column", justifyContent: "space-between", padding: 56,
        background: g ? T.green : T.surface, border: `1px solid ${g ? T.green : T.line}`, borderRadius: 24,
      },
      h(
        { alignItems: "center", justifyContent: "space-between" },
        h(
          { alignItems: "center", gap: 16 },
          h(
            { width: 48, height: 48, borderRadius: 12, background: T.ink, alignItems: "center", justifyContent: "center",
              fontFamily: "DM Sans", fontWeight: 600, fontSize: 24, color: T.bg },
            "O",
          ),
          h({ fontFamily: "DM Sans", fontWeight: 600, fontSize: 28, color: g ? "#fff" : T.ink }, "Omoakins"),
        ),
        h({ ...mono, color: g ? T.mint2 : T.mint }, clip(card.eyebrow, 40)),
      ),
      h(
        { flexDirection: "column", gap: 20 },
        h({ fontFamily: "Bebas Neue", fontSize: titleSize, lineHeight: 0.92, color: g ? T.onGreen : T.ink }, clip(card.title, 60)),
        h(
          { alignItems: "flex-end", justifyContent: "space-between", gap: 40 },
          h({ fontFamily: "DM Sans", fontSize: 26, lineHeight: 1.45, color: g ? T.mint2 : T.body, maxWidth: 760 }, clip(card.description, 130)),
          ...(card.action
            ? [h({ ...mono, fontSize: 16, color: T.onGreen, background: g ? "rgba(0,0,0,.25)" : T.green,
                  padding: "14px 22px", borderRadius: 999, flexShrink: 0 }, card.action)]
            : []),
        ),
      ),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
