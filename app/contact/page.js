import LocalTime from "@/components/LocalTime";
import Faq from "@/components/Faq";
import { getSettings } from "@/lib/data";

export const metadata = { title: "Contact" };
export const revalidate = 60;

// Aliyu's contact: availability, local time, a big email block, then the FAQ.
export default async function Contact() {
  const s = await getSettings();
  return (
    <>
      <section className="container page-hero">
        <h1>Contact</h1>
        <dl className="contact-grid">
          <div><dt>Availability</dt><dd>{s.availability}</dd></div>
          <div><dt>Local time</dt><dd><LocalTime timezone={s.timezone} /> in {s.location.split(",")[0]}</dd></div>
          <div><dt>Response</dt><dd>Email is fastest</dd></div>
        </dl>
        {s.email ? <a href={`mailto:${s.email}`} className="email-block">{s.email}</a> : <p className="email-block muted">Email coming soon</p>}
      </section>
      <Faq items={s.faq} categories={s.faqCategories} />
    </>
  );
}
