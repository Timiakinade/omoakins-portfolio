import Button from "@/components/Button";
export default function NotFound() {
  return (
    <section className="container page-hero" style={{ borderBottom: 0 }}>
      <h1>Not found</h1>
      <p>That page does not exist, or it has moved.</p>
      <div style={{ marginTop: 32 }}><Button href="/">Back to the work</Button></div>
    </section>
  );
}
