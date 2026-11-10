import Link from "next/link";
import { notFound } from "next/navigation";
import Frame from "@/components/Frame";
import CaseProgress from "@/components/CaseProgress";
import { Block, toSections } from "@/components/blocks/Blocks";
import { getCaseStudies, getCaseStudy } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getCaseStudies();
  return all.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getCaseStudy(slug);
  if (!found) return {};
  return { title: found.study.client ? `${found.study.client}: ${found.study.title}` : found.study.title, description: found.study.summary };
}

// Theme JSON on the record becomes CSS custom properties on the wrapper,
// so each study gets its own type and colour inside the constant shell.
function themeVars(t = {}) {
  const map = {
    "--cs-bg": t.bg, "--cs-surface": t.surface, "--cs-ink": t.ink, "--cs-muted": t.muted, "--cs-line": t.line,
    "--cs-accent": t.accent, "--cs-accent-soft": t.accentSoft, "--cs-on-accent": t.onAccent,
    "--cs-display": t.display, "--cs-display-style": t.displayStyle, "--cs-display-weight": t.displayWeight, "--cs-body": t.body,
  };
  return Object.fromEntries(Object.entries(map).filter(([, v]) => v !== undefined && v !== ""));
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const found = await getCaseStudy(slug);
  if (!found) notFound();
  const { study, next, total } = found;
  const sections = toSections(study.blocks);

  return (
    <>
      <article className="cs" style={themeVars(study.theme)}>
        <header className="container cs-hero">
          <div className="cs-eyebrow">
            {study.badge && <span className="badge">{study.badge}</span>}
            <span className="mono">{[study.kind, study.client, study.year].filter(Boolean).join(" · ")}</span>
          </div>
          <h1 className="cs-title">{study.title}</h1>
          {study.summary && <p className="cs-summary">{study.summary}</p>}
          {study.meta?.length > 0 && (
            <dl className="cs-meta">
              {study.meta.map((m) => (
                <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
              ))}
            </dl>
          )}
          <div className="cs-cover">
            <Frame src={study.cover?.src} alt={study.cover?.alt} ratio={study.cover?.ratio} label="Cover image" />
          </div>
        </header>

        <div className="container cs-layout">
          <CaseProgress sections={sections.map(({ id, label, title }) => ({ id, label, title }))} />
          <div className="cs-content">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="cs-section" aria-labelledby={`${section.id}-h`}>
                {(section.label || section.title) && (
                  <div className="cs-section-head">
                    <span className="label">({String(i + 1).padStart(2, "0")}) {section.label}</span>
                    {section.title && <h2 id={`${section.id}-h`}>{section.title}</h2>}
                  </div>
                )}
                {section.blocks.map((block, j) => <Block key={j} block={block} study={study} />)}
              </section>
            ))}
          </div>
        </div>
      </article>

      {total > 1 && next && (
        <aside className="container next-project">
          <Link href={`/work/${next.slug}`}>
            <span className="mono muted">Next project</span>
            <span className="title">{next.title} <span aria-hidden="true">→</span></span>
          </Link>
        </aside>
      )}
    </>
  );
}
