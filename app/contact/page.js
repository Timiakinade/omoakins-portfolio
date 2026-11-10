import Faq from "@/components/Faq";
import { getSettings } from "@/lib/data";

export const metadata = { title: "Contact" };
export const revalidate = 60;

export default async function Contact() {
  const s = await getSettings();
  const links = s.links.filter((l) => l.url);
  return (
    <>
      <section className="container page-hero">
        <h1>Contact</h1>
        <p className="availability" style={{ fontSize: 18 }}><span className="dot" aria-hidden="true" />{s.availability}</p>
      </section>
      <section className="container split">
        <h2>Email</h2>
        <div>
          {s.email ? (
            <a href={`mailto:${s.email}`} className="email-block">{s.email}</a>
          ) : (
            <p className="email-block muted">Email coming soon</p>
          )}
          <p className="muted" style={{ marginTop: 16 }}>Based in {s.location}. Working with teams anywhere.</p>
        </div>
      </section>
      {links.length > 0 && (
        <section className="container split">
          <h2>Elsewhere</h2>
          <ul className="link-list">
            {links.map((l) => (
              <li key={l.label}><a href={l.url} target="_blank" rel="noreferrer">{l.label}<span aria-hidden="true">↗</span></a></li>
            ))}
          </ul>
        </section>
      )}
      <Faq items={s.faq} />
    </>
  );
}
