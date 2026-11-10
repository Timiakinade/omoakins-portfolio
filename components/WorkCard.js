import Link from "next/link";
import Frame from "./Frame";

export default function WorkCard({ study, index }) {
  const t = study.theme || {};
  const num = String(index + 1).padStart(2, "0");
  const coverStyle = {
    "--frame-bg": t.mode === "dark" ? t.surface : t.accent,
    color: t.mode === "dark" ? t.accent : t.onAccent,
  };
  return (
    <article className="card">
      <Link href={`/work/${study.slug}`} className="card-media" aria-label={study.title} tabIndex={-1}>
        <div style={coverStyle}>
          <Frame src={study.cover?.src} alt={study.cover?.alt} ratio={study.cover?.ratio}>
            {!study.cover?.src && (
              <div className="cover-art">
                <span className="kind">{study.kind}</span>
                <span className="client" style={{ fontFamily: t.display, fontStyle: t.displayStyle, fontWeight: t.displayWeight }}>{study.client}</span>
              </div>
            )}
          </Frame>
        </div>
      </Link>
      <div className="card-body">
        <span className="card-num">{num}</span>
        <div className="card-text">
          <div className="card-meta">
            {study.badge && <span className="badge">{study.badge}</span>}
            <span>{[study.kind, study.client, study.year].filter(Boolean).join(" · ")}</span>
          </div>
          <h3 className="card-title"><Link href={`/work/${study.slug}`}>{study.title}</Link></h3>
          <p className="card-summary">{study.summary}</p>
          {study.tags?.length > 0 && (
            <div className="tags">{study.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
          )}
          <Link href={`/work/${study.slug}`} className="card-link">View project <span className="arrow" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
