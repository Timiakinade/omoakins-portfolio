import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container page-hero" style={{ borderBottom: 0, paddingBottom: 144 }}>
      <h1>Not found</h1>
      <p>That page does not exist, or it has moved.</p>
      <div style={{ marginTop: 32 }}><Link href="/" className="btn btn-primary">Back to the work <span className="arrow" aria-hidden="true">→</span></Link></div>
    </section>
  );
}
