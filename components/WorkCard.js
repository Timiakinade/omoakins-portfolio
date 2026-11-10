import Link from "next/link";
import Media from "./Media";

// One row of the work index: number, meta, claim title, blurb, tags, themed preview.
export default function WorkCard({ study, index }) {
  const t = study.theme || {};
  const thumb = { "--frame-bg": t.mode === "dark" ? t.surface : t.accent, color: t.mode === "dark" ? t.accent : t.onAccent };
  return (
    <Link href={`/work/${study.slug}`} className="row reveal">
      <span className="num">{String(index + 1).padStart(2, "0")}</span>
      <div className="main">
        <div className="meta">
          {study.badge && <span className="badge">{study.badge}</span>}
          <span>{[study.kind, study.client, study.year].filter(Boolean).join(" · ")}</span>
        </div>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        {study.tags?.length > 0 && <div className="tags">{study.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>}
      </div>
      <div className="thumb">
        <Media src={study.cover?.src} alt={study.cover?.alt} ratio={1.5} style={thumb}>
          {!study.cover?.src && (
            <div className="cover-art">
              <span className="kind">{study.kind}</span>
              <span className="client">{study.client}</span>
            </div>
          )}
        </Media>
      </div>
    </Link>
  );
}
