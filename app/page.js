import { Suspense } from "react";
import Media from "@/components/Media";
import Button from "@/components/Button";
import WorkSection from "@/components/WorkSection";
import Faq from "@/components/Faq";
import SectionRail from "@/components/SectionRail";
import { Cursor } from "@/components/Icons";
import { getCaseStudies, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [s, studies] = await Promise.all([getSettings(), getCaseStudies()]);
  const h = s.hero;
  return (
    <>
      {/* Tariq's canvas header */}
      <section className="canvas" aria-labelledby="hero-title">
        <svg className="stroke stroke-a" viewBox="0 0 520 420" aria-hidden="true">
          <defs><linearGradient id="ga" x1="0" x2="1"><stop offset="0" stopColor="#1B5E4A" /><stop offset="1" stopColor="#6EE7B7" /></linearGradient></defs>
          <path stroke="url(#ga)" d="M-20 380 C 120 380 240 300 250 200 C 260 90 160 60 130 120 C 100 190 220 230 300 150 C 360 90 380 30 400 -20" />
        </svg>
        <svg className="stroke stroke-b" viewBox="0 0 420 360" aria-hidden="true">
          <defs><linearGradient id="gb" x1="0" x2="1"><stop offset="0" stopColor="#6EE7B7" /><stop offset="1" stopColor="#1B5E4A" /></linearGradient></defs>
          <path stroke="url(#gb)" d="M440 40 C 300 20 180 80 170 180 C 160 280 260 330 360 300" />
        </svg>
        <div className="frame-wrap">
          <div className="frame-meta">
            <span className="frame-label">{h.frameLabel}</span>
            <span className="status"><span className="dots" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>{s.availability}</span>
          </div>
          <div className="frame">
            <span className="handle h-tl" /><span className="handle h-tr" /><span className="handle h-bl" /><span className="handle h-br" />
            <Media src={h.portrait} alt={`Portrait of ${s.name}`} ratio={315 / 368} label="Portrait" className="portrait" />
            <div className="frame-copy">
              <h1 id="hero-title">{h.heading}</h1>
              <p>{h.body}</p>
            </div>
          </div>
          <div className="cursor" aria-hidden="true"><Cursor /><span>{h.cursor}</span></div>
        </div>
        <div className="hero-ctas">
          <Button href="/#work">View work</Button>
          <Button href={s.email ? `mailto:${s.email}` : "/contact"} ghost>Get in touch</Button>
        </div>
      </section>

      <SectionRail items={[{ id: "work", label: "Work" }, { id: "faq", label: "FAQ" }, { id: "contact", label: "Contact" }]} />

      <Suspense fallback={null}>
        <WorkSection studies={studies} categories={s.categories} subgroups={s.subgroups} />
      </Suspense>

      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
