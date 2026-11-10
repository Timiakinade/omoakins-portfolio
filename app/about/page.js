import Faq from "@/components/Faq";
import { getSettings } from "@/lib/data";

export const metadata = { title: "About" };
export const revalidate = 60;

export default async function About() {
  const s = await getSettings();
  const a = s.about;
  return (
    <>
      <section className="container page-hero">
        <h1>About</h1>
        <p>{a.heading}</p>
      </section>
      <section className="container split">
        <h2>Story</h2>
        <div className="body">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      </section>
      {a.now && (
        <section className="container split">
          <h2>Now</h2>
          <div className="body"><p>{a.now}</p></div>
        </section>
      )}
      <section className="container split">
        <h2>Toolkit</h2>
        <ul className="toolkit">{a.toolkit.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
      </section>
      <section className="container split">
        <h2>Brands</h2>
        <ul className="toolkit">{s.clients.map((c) => <li key={c} className="tag">{c}</li>)}</ul>
      </section>
      <Faq items={s.faq} />
    </>
  );
}
