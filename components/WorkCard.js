import Link from "next/link";
import Media from "./Media";
import Button from "./Button";

// Tsolaye's tier 1 card: media, badge, kind · client · year, claim title, blurb with a number, tags.
export default function WorkCard({ study }) {
  const t = study.theme || {};
  const coverStyle = { "--frame-bg": t.mode === "dark" ? t.surface : t.accent, color: t.mode === "dark" ? t.accent : t.onAccent };
  const href = `/work/${study.slug}`;
  return (
    <article className="card reveal">
      <Link href={href} className="card-media" tabIndex={-1} aria-hidden="true">
        <Media src={study.cover?.src} alt={study.cover?.alt} ratio={1.55} style={coverStyle}>
          {!study.cover?.src && (
            <div className="cover-art">
              <span className="kind">{study.kind}</span>
              <span className="client" style={{ fontFamily: t.display, fontStyle: t.displayStyle, fontWeight: t.displayWeight }}>{study.client}</span>
            </div>
          )}
        </Media>
      </Link>
      <div className="card-body">
        <div className="card-meta">
          {study.badge && <span className="badge">{study.badge}</span>}
          <span>{[study.kind, study.client, study.year].filter(Boolean).join(" · ")}</span>
        </div>
        <h3 className="card-title"><Link href={href}>{study.title}</Link></h3>
        <p className="card-summary">{study.summary}</p>
        {study.tags?.length > 0 && <div className="tags">{study.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>}
        <Button href={href}>View project</Button>
      </div>
    </article>
  );
}
