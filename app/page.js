import { Suspense } from "react";
import Link from "next/link";
import WorkSection from "@/components/WorkSection";
import Faq from "@/components/Faq";
import { getCaseStudies, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [settings, studies] = await Promise.all([getSettings(), getCaseStudies()]);
  const behance = settings.links.find((l) => l.label === "Behance" && l.url);
  return (
    <>
      <div className="container home">
        <aside className="rail">
          <h1 className="hero-line"><span>{settings.heroLead}</span> <span>{settings.heroLine}</span></h1>
          <p className="rail-intro">{settings.intro}</p>
          {settings.availability && (
            <p className="availability"><span className="dot" aria-hidden="true" />{settings.availability}</p>
          )}
          <div className="rail-ctas">
            <Link href={settings.email ? `mailto:${settings.email}` : "/contact"} className="btn btn-primary">
              Get in touch <span className="arrow" aria-hidden="true">→</span>
            </Link>
            {behance && <a href={behance.url} className="btn" target="_blank" rel="noreferrer">Behance</a>}
          </div>
          {settings.clients?.length > 0 && (
            <div className="rail-clients">
              <span className="mono muted">Brands I have worked with</span>
              <ul>{settings.clients.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          )}
        </aside>
        <div>
          <Suspense fallback={null}>
            <WorkSection studies={studies} categories={settings.categories} subgroups={settings.subgroups} />
          </Suspense>
        </div>
      </div>
      <Faq items={settings.faq} />
    </>
  );
}
