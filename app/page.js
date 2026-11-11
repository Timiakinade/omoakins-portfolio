import { Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import WorkSection from "@/components/WorkSection";
import Faq from "@/components/Faq";
import SectionRail from "@/components/SectionRail";
import LocalTime from "@/components/LocalTime";
import { Arrow } from "@/components/Icons";
import { getCaseStudies, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [s, studies] = await Promise.all([getSettings(), getCaseStudies()]);
  const h = s.hero;
  const feat = studies[0];
  const ft = feat?.theme || {};
  const stat = feat?.blocks?.find((b) => b.type === "stats")?.items?.[0];
  const pathOn = s.path.length - 1;

  return (
    <>
      <section className="container home-hero" aria-labelledby="statement">
        <h1 id="statement" className="statement">
          <span>{h.statement[0]}</span>
          <span className="accent">{h.statement[1]}</span>
        </h1>
        <div className="hero-meta">
          <div className="who">{s.name && <span>{s.name}</span>}<span>{s.role}</span><span>{s.location}</span></div>
          <span className="live"><span className="pulse" aria-hidden="true" />{s.availability}</span>
        </div>

        <div className="bento">
          <div className="tile t-intro reveal">
            <span className="kicker">Intro</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2><span className="soft">{h.intro}</span> {h.heading}</h2>
              <p>{h.body}</p>
            </div>
            <div className="ctas">
              <Button href="/#work">View work</Button>
              <Button href={s.email ? `mailto:${s.email}` : "/contact"} ghost>Get in touch</Button>
            </div>
          </div>

          {feat && (
            <Link href={`/work/${feat.slug}`} className="tile t-feature reveal"
              style={{ "--feat-bg": ft.mode === "dark" ? ft.surface : ft.accent, "--feat-ink": ft.mode === "dark" ? ft.accent : ft.onAccent }}>
              <span className="kicker">Featured · {feat.client}</span>
              {stat && (
                <div>
                  <div className="big">{stat.value}</div>
                  <p className="cap">people surveyed {stat.label}</p>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p className="title">{feat.title}</p>
                <span className="go">Read the case study <Arrow /></span>
              </div>
            </Link>
          )}

          <div className="tile t-path reveal">
            <span className="kicker">The path</span>
            <ol className="path">
              {s.path.map((p, i) => <li key={p} className={i === pathOn ? "on" : ""}><span className="node" aria-hidden="true" />{p}</li>)}
            </ol>
          </div>

          <div className="tile t-sectors reveal">
            <span className="kicker">Sectors</span>
            <div className="tags">{s.sectors.map((x) => <span key={x} className="tag">{x}</span>)}</div>
            <span className="count">{String(s.sectors.length).padStart(2, "0")} sectors</span>
          </div>

          <div className="tile t-now reveal">
            <span className="kicker">Now · {s.about.nowUpdated}</span>
            <p>{s.about.now}</p>
            <div className="clock"><span>{s.location.split(",")[0]}</span><LocalTime timezone={s.timezone} /></div>
          </div>

          <div className="tile t-brands reveal">
            <span className="kicker">Brands I have worked with</span>
            <ul>{s.clients.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      <SectionRail items={[{ id: "work", label: "Work" }, { id: "faq", label: "Questions" }, { id: "contact", label: "Contact" }]} />

      <Suspense fallback={null}>
        <WorkSection studies={studies} categories={s.categories} subgroups={s.subgroups} />
      </Suspense>

      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
