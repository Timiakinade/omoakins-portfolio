export default function Faq({ items, title = "Questions" }) {
  if (!items?.length) return null;
  return (
    <section className="container faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">{title}</h2>
      <div className="faq">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}<span className="plus" aria-hidden="true">+</span></summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
