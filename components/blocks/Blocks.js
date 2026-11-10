import Media from "../Media";
import Button from "../Button";
import PinGallery from "./PinGallery";
import { Play, ArrowUpRight } from "../Icons";

const paragraphs = (body) => (Array.isArray(body) ? body : String(body || "").split(/\n\n+/)).filter(Boolean);

function Figure({ item }) {
  return (
    <figure className="b-figure">
      <Media src={item.src} alt={item.alt} ratio={item.ratio} label={item.caption} />
      {item.caption && item.src && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

export function Block({ block, study }) {
  switch (block.type) {
    case "text":
      return <div className="b-text">{paragraphs(block.body).map((p, i) => <p key={i}>{p}</p>)}</div>;
    case "heading":
      return <h3 className="b-heading">{block.text}</h3>;
    case "image":
      return <Figure item={block} />;
    case "gallery":
      return (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: `repeat(${block.columns || 2}, minmax(0, 1fr))` }}>
          {(block.items || []).map((it, i) => <Figure key={i} item={it} />)}
        </div>
      );
    case "slider":
      return <PinGallery items={block.items} />;
    case "stats":
      return <div className="b-stats">{(block.items || []).map((s, i) => <div key={i} className="stat"><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>;
    case "decisions":
      return (
        <div className="b-decisions">
          {(block.items || []).map((d, i) => (
            <div key={i} className="decision">
              <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{d.title}</h3><p>{d.body}</p></div>
            </div>
          ))}
        </div>
      );
    case "quote":
      return <blockquote className="b-quote"><p>{block.text}</p>{block.cite && <cite>{block.cite}</cite>}</blockquote>;
    case "callout":
      return <p className="b-callout">{block.text}</p>;
    case "prototype":
      return (
        <div className="proto">
          <h3><Play />{block.title || "Try the live prototype"}</h3>
          {block.note && <p>{block.note}</p>}
          <Button href={block.url} external icon={<ArrowUpRight />} disabled={!block.url}>{block.url ? block.label || "Open prototype" : "Prototype coming soon"}</Button>
        </div>
      );
    case "outbound": {
      const url = block.url || study.external_url;
      if (!url) return null;
      return (
        <div className="b-outbound">
          <p>Research artefacts, full flows and exploration rounds live on Behance.</p>
          <Button href={url} external icon={<ArrowUpRight />}>{block.label || study.external_label || "Full case study"}</Button>
        </div>
      );
    }
    case "divider":
      return <hr style={{ border: 0, borderTop: "1px solid var(--cs-line)", margin: 0 }} />;
    default:
      return null;
  }
}

// Splits the flat block array into numbered sections at each "section" block.
export function toSections(blocks = []) {
  const out = [];
  let cur = null;
  for (const b of blocks) {
    if (b.type === "section") {
      cur = { id: slug(b.label || b.title || `section-${out.length + 1}`), label: b.label, title: b.title, blocks: [] };
      out.push(cur);
    } else {
      if (!cur) { cur = { id: "intro", label: "Intro", title: "", blocks: [] }; out.push(cur); }
      cur.blocks.push(b);
    }
  }
  return out;
}
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
