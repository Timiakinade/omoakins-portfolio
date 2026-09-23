import type { APIRoute } from "astro";
import { renderOg, type OgCard } from "../../lib/og";
import { getPages, getPosts, getProjects, getSite, shortName } from "../../lib/content";

// One image per page; the key matches the `og` prop each page passes to Base.astro.
export async function getStaticPaths() {
  const site = await getSite();
  const cards: Record<string, OgCard> = {
    home: { eyebrow: "Brand & product design", title: site.tagline, description: site.home.intro },
    work: { eyebrow: "Selected work", title: site.work.heading, description: `Brand and product design across ${site.about.whereIWork.join(", ").toLowerCase()}.`, action: "View work" },
    about: { eyebrow: site.about.kicker, title: site.about.headline.join(" "), description: site.about.body },
    contact: { eyebrow: site.contact.availability, title: site.contact.headline.join(" "), description: site.contact.pitch, action: "Start a project", highlight: true },
    blog: { eyebrow: "Blog", title: site.blog.heading, description: site.blog.intro, action: "Read" },
  };
  for (const p of await getProjects()) {
    cards[`work/${p.id}`] = {
      eyebrow: `Case study · ${p.data.sector}`,
      title: shortName(p.data.name),
      description: p.data.summary,
      action: "View case study",
      highlight: p.data.highlight,
    };
  }
  for (const p of await getPosts()) {
    cards[`blog/${p.id}`] = { eyebrow: `Blog · ${p.data.tags[0] ?? site.name}`, title: p.data.title, description: p.data.description, action: "Read post" };
  }
  for (const p of await getPages()) {
    cards[p.id] = { eyebrow: site.name, title: p.data.title, description: p.data.description };
  }
  return Object.entries(cards).map(([path, card]) => ({ params: { path }, props: { card } }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props.card as OgCard);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
