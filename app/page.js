import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Services from "@/components/home/Services";
import WorkSection from "@/components/WorkSection";
import Faq from "@/components/Faq";
import SectionRail from "@/components/SectionRail";
import { getCaseStudies, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [s, studies] = await Promise.all([getSettings(), getCaseStudies()]);
  const h = s.hero;

  return (
    <>
      <Hero
        name={s.heroName}
        portrait={h.portrait}
        portraitDark={h.portraitDark}
        roles={s.roleLines}
        socials={s.socials.filter((x) => x.url)}
      />
      <Intro lead={h.intro2.lead} soft={h.intro2.soft} body={h.body} cta={h.intro2.cta} />
      <Services items={s.services} />

      <SectionRail items={[{ id: "intro", label: "Intro" }, { id: "services", label: "Services" }, { id: "work", label: "Work" }, { id: "faq", label: "Questions" }, { id: "contact", label: "Contact" }]} />

      <Suspense fallback={null}>
        <WorkSection studies={studies} categories={s.categories} subgroups={s.subgroups} />
      </Suspense>

      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
