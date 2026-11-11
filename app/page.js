import { Suspense } from "react";
import Button from "@/components/Button";
import WorkSection from "@/components/WorkSection";
import Faq from "@/components/Faq";
import Marquee from "@/components/Marquee";
import SectionRail from "@/components/SectionRail";
import { getCaseStudies, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [s, studies] = await Promise.all([getSettings(), getCaseStudies()]);
  const h = s.hero;

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

        <div className="home-intro reveal">
          <p className="lead"><span className="soft">{h.intro}</span> {h.heading}</p>
          <p className="sub">{h.body}</p>
          <div className="ctas">
            <Button href="/#work">View work</Button>
            <Button href={s.email ? `mailto:${s.email}` : "/contact"} ghost>Get in touch</Button>
          </div>
        </div>
      </section>

      <Marquee items={s.clients} />

      <SectionRail items={[{ id: "work", label: "Work" }, { id: "faq", label: "Questions" }, { id: "contact", label: "Contact" }]} />

      <Suspense fallback={null}>
        <WorkSection studies={studies} categories={s.categories} subgroups={s.subgroups} />
      </Suspense>

      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
