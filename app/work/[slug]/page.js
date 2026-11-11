import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import CaseNav from "@/components/CaseNav";
import { Block, toSections } from "@/components/blocks/Blocks";
import { getCaseStudies, getCaseStudy } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getCaseStudies()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const f = await getCaseStudy(slug);
  return f ? { title: `${f.study.client}: ${f.study.title}`, description: f.study.summary } : {};
}

// Theme JSON becomes CSS variables on the wrapper: same shell, unique interior (Tsolaye).
function themeVars(t = {}) {
  const map = {
    "--cs-bg": t.bg, "--cs-surface": t.surface, "--cs-ink": t.ink, "--cs-muted": t.muted, "--cs-line": t.line,
    "--cs-accent": t.accent, "--cs-accent-soft": t.accentSoft, "--cs-on-accent": t.onAccent,
    "--cs-display": t.display, "--cs-display-style": t.displayStyle, "--cs-display-weight": t.displayWeight, "--cs-body": t.body,
  };
  return Object.fromEntries(Object.entries(map).filter(([, v]) => v !== undefined && v !== ""));
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const f = await getCaseStudy(slug);
  if (!f) notFound();
  const { study, next, total } = f;
  const sections = toSections(study.blocks);

  return (
    <>
      <article className="cs" style={themeVars(study.theme)}>
        {/* Iyanu's hero */}
        <header className="cs-hero">
          <div className="cs-orb" aria-hidden="true" />
          <div className="container">
            <span className="eyebrow">{study.badge && <span className="badge">{study.badge}</span>}{[study.kind, study.client, study.year].filter(Boolean).join(" · ")}</span>
            <h1 className="cs-title">{study.title}</h1>
            {study.summary && <p className="cs-desc">{study.summary}</p>}
            {study.meta?.length > 0 && (
              <dl className="cs-meta">{study.meta.map((m) => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>
            )}
          </div>
        </header>
        {study.glance?.length > 0 && (
          <div className="container cs-glance-wrap">
            <span className="b-label">Results at a glance</span>
            <dl className="cs-glance">{study.glance.map((g) => <div key={g.label}><dt>{g.value}</dt><dd>{g.label}</dd></div>)}</dl>
          </div>
        )}
        {(study.cover?.src || study.cover?.phones?.length) && <div className="container cs-cover">
          {study.cover?.phones?.length ? (
            <div className="cover-phones" role="img" aria-label={study.cover.alt}>
              {study.cover.phones.map((src, i) => <img key={src} src={src} alt="" className={`cp cp-${i}`} />)}
            </div>
          ) : (
            <Media src={study.cover?.src} alt={study.cover?.alt} ratio={study.cover?.ratio} label="Cover image" />
          )}
        </div>}

        {/* Aliyu's chapter layout */}
        <div className="container cs-layout">
          <CaseNav sections={sections.map(({ id, label, title }) => ({ id, label, title }))} />
          <div className="cs-content">
            {sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} className="cs-section" aria-labelledby={`${sec.id}-h`}>
                <div className="cs-section-head reveal">
                  <span className="label">({String(i + 1).padStart(2, "0")}) {sec.label}</span>
                  {sec.title && <h2 id={`${sec.id}-h`}>{sec.title}</h2>}
                </div>
                {sec.blocks.map((b, j) => <Block key={j} block={b} study={study} />)}
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Aliyu's next project */}
      {total > 1 && next && (
        <Link href={`/work/${next.slug}`} className="next">
          <span className="lbl">Next project</span>
          <span className="title">{next.title} →</span>
          <span className="sub">{[next.client, next.kind, next.year].filter(Boolean).join(" · ")}</span>
        </Link>
      )}
    </>
  );
}
