import Media from "../Media";
import ExpandImage from "../ExpandImage";
import Button from "../Button";
import PinGallery from "./PinGallery";
import { Play, ArrowUpRight } from "../Icons";

const paragraphs = (body) => (Array.isArray(body) ? body : String(body || "").split(/\n\n+/)).filter(Boolean);

function Figure({ item }) {
  // Tall images (or any image marked expand) get a preview and an Expand button.
  const tall = item.src && (item.expand || (item.ratio && item.ratio < 0.75));
  return (
    <figure className="b-figure">
      {tall ? <ExpandImage src={item.src} alt={item.alt} /> : <Media src={item.src} alt={item.alt} ratio={item.ratio} label={item.caption} />}
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
      if (block.detailed) {
        return (
          <div className="b-ddecisions">
            {(block.items || []).map((d, i) => (
              <article key={i} className={`ddecision reveal${(d.images || []).length ? "" : " no-shots"}`}>
                <div className="dd-copy">
                  <span className="g-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{d.title}</h3>
                  {[["Problem", d.problem], ["Decision", d.decision], ["Why", d.why]].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="dd-part"><span className="b-label">{k}</span><p>{v}</p></div>
                  ))}
                </div>
                {(d.images || []).length > 0 && <div className={`dd-shots n${(d.images || []).length}`}>
                  {(d.images || []).map((im, j) => (
                    <figure key={j} className="dd-shot">
                      {im.tag && <figcaption className={`dd-tag ${im.tag === "Before" ? "is-before" : ""}`}>{im.tag}</figcaption>}
                      <Media src={im.src} alt={im.alt} ratio={im.ratio || 390 / 844} className="screen" />
                    </figure>
                  ))}
                </div>}
              </article>
            ))}
          </div>
        );
      }
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
    case "context":
      return (
        <div className="b-context">
          <div><span className="b-label">The product</span><p>{block.product}</p></div>
          <div><span className="b-label">My role</span><ul className="b-bullets">{(block.role || []).map((r, i) => <li key={i}>{r}</li>)}</ul></div>
        </div>
      );
    case "scope":
      return (
        <div className="b-scope">
          <div><span className="b-label">In scope</span><ul className="b-bullets">{(block.in || []).map((r, i) => <li key={i}>{r}</li>)}</ul></div>
          <div><span className="b-label">Out of scope</span><ul className="b-bullets muted-list">{(block.out || []).map((r, i) => <li key={i}>{r}</li>)}</ul></div>
        </div>
      );
    case "bars":
      return (
        <div className="b-bars">
          {block.title && <p className="b-bars-title">{block.title}</p>}
          {block.note && <p className="b-bars-note">{block.note}</p>}
          {(block.items || []).map((it, i) => (
            <div key={i} className="bar-row">
              <span>{it.label}</span>
              <span className="bar"><span style={{ width: `${(it.value / it.of) * 100}%` }} /></span>
              <span className="bar-val">{it.value} of {it.of}</span>
            </div>
          ))}
        </div>
      );
    case "journey": {
      const rows = [["What happens today", "today"], ["What users said", "said"], ["Likely feeling", "feeling"], ["In the redesign", "fix"]];
      const st = block.stages || [];
      return (
        <div className="b-journey" role="region" aria-label="Journey map" tabIndex={0}>
          <table>
            <thead><tr><th scope="col">Stage</th>{st.map((s, i) => <th key={i} scope="col"><span className="j-n">{i + 1}</span>{s.stage}</th>)}</tr></thead>
            <tbody>
              {rows.map(([label, key]) => (
                <tr key={key} className={`j-${key}`}>
                  <th scope="row">{label}</th>
                  {st.map((s, i) => <td key={i}>{key === "feeling" ? <span className="j-pill">{s[key]}</span> : s[key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "findings":
      return (
        <div className="b-findings">
          {(block.items || []).map((f, i) => (
            <article key={i} className="finding">
              <div className="f-head"><span className="f-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span><h3>{f.title}</h3></div>
              {f.by && <span className="f-by">Raised by {f.by}</span>}
              <p>{f.body}</p>
              {f.quote && <blockquote><p>&ldquo;{f.quote}&rdquo;</p>{f.who && <cite>{f.who}</cite>}</blockquote>}
            </article>
          ))}
        </div>
      );
    case "goals":
      return (
        <ol className="b-goals">
          {(block.items || []).map((g, i) => (
            <li key={i}><span className="g-n">{String(i + 1).padStart(2, "0")}</span><h3>{g.title}</h3><p>{g.body}</p></li>
          ))}
        </ol>
      );
    case "hmw":
      return (
        <div className="b-hmw">
          {block.intro && <p className="hmw-intro">{block.intro}</p>}
          <ol>
            {(block.items || []).map((h, i) => (
              <li key={i}><span className="g-n">{String(i + 1).padStart(2, "0")}</span><p><em>How might we</em> {h.q}</p>{h.from && <span className="f-by">From {h.from}</span>}</li>
            ))}
          </ol>
        </div>
      );
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
