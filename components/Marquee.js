// "Worked with" strip. Pure CSS loop, the second copy is hidden from assistive tech.
export default function Marquee({ label = "Worked with", items = [] }) {
  if (!items.length) return null;
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
  return (
    <section className="container marquee-wrap" aria-label={label}>
      <span className="marquee-label">{label}</span>
      <div className="marquee">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
