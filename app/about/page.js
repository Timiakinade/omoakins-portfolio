import Faq from "@/components/Faq";
import { getSettings } from "@/lib/data";

export const metadata = { title: "About" };
export const revalidate = 60;

// Aliyu's about: pinned chapter title with the story scrolling past, then Now and Toolkit.
export default async function About() {
  const s = await getSettings();
  const a = s.about;
  return (
    <>
      <section className="container page-hero">
        <h1>About</h1>
        <p>{a.intro}</p>
      </section>
      <section className="container story" aria-labelledby="story-title">
        <div className="story-sticky">
          <h2 id="story-title">{a.heading}</h2>
          <p className="count">{String(a.chapters.length).padStart(2, "0")} chapters</p>
        </div>
        <div>
          {a.chapters.map((c, i) => (
            <article key={c.label} className="chapter reveal">
              <span className="lbl">{String(i + 1).padStart(2, "0")} · {c.label}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container split">
        <h2>Now · {a.nowUpdated}</h2>
        <p className="body">{a.now}</p>
      </section>
      <section className="container split">
        <h2>Toolkit</h2>
        <ul className="chips">{a.toolkit.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
      </section>
      <section className="container split">
        <h2>Brands</h2>
        <ul className="chips">{s.clients.map((c) => <li key={c} className="tag">{c}</li>)}</ul>
      </section>
      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
