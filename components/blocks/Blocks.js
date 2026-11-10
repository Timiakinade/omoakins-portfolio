import Frame from "../Frame";
import Slider from "./Slider";

const paragraphs = (body) => (Array.isArray(body) ? body : String(body || "").split(/\n\n+/)).filter(Boolean);

function Figure({ item, width = "wide" }) {
  return (
    <figure className={`w-${width}`} style={{ margin: 0 }}>
      <Frame src={item.src} alt={item.alt} ratio={item.ratio} label={item.caption} />
      {item.caption && item.src && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

export function Block({ block, study }) {
  switch (block.type) {
    case "text":
      return (
        <div className={`b-text ${block.width === "lede" ? "lede" : ""}`}>
          {paragraphs(block.body).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      );
    case "heading":
      return <h3 className="b-heading">{block.text}</h3>;
    case "image":
      return <Figure item={block} width={block.width} />;
    case "gallery":
      return (
        <div className="b-gallery" style={{ gridTemplateColumns: `repeat(${block.columns || 2}, minmax(0, 1fr))` }}>
          {(block.items || []).map((item, i) => <Figure key={i} item={item} width="full" />)}
        </div>
      );
    case "slider":
      return <Slider items={block.items} />;
    case "stats":
      return (
        <div className="b-stats">
          {(block.items || []).map((s, i) => (
            <div key={i} className="stat"><strong>{s.value}</strong><span>{s.label}</span></div>
          ))}
        </div>
      );
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
      return (
        <blockquote className="b-quote" style={{ margin: 0 }}>
          <p>{block.text}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    case "callout":
      return <p className="b-callout">{block.text}</p>;
    case "prototype":
      return (
        <div className="b-prototype">
          <p>{block.note}</p>
          {block.url ? (
            <a href={block.url} target="_blank" rel="noreferrer" className="btn btn-accent">
              {block.label || "Open the prototype"} <span className="arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="btn" aria-disabled="true">Prototype link coming soon</span>
          )}
        </div>
      );
    case "outbound": {
      const url = block.url || study.external_url;
      if (!url) return null;
      return (
        <div className="b-outbound">
          <p>Research artefacts, full flows and exploration rounds live on Behance.</p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-accent">
            {block.label || study.external_label || "See the full case study on Behance"} <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      );
    }
    case "divider":
      return <hr className="b-divider" />;
    default:
      return null;
  }
}

// Splits the flat block array into numbered sections at each "section" block.
export function toSections(blocks = []) {
  const sections = [];
  let current = null;
  for (const block of blocks) {
    if (block.type === "section") {
      current = { id: slugify(block.label || block.title || `section-${sections.length + 1}`), label: block.label, title: block.title, blocks: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { id: "intro", label: "", title: "", blocks: [] };
        sections.push(current);
      }
      current.blocks.push(block);
    }
  }
  return sections;
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
