import Link from "next/link";

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const href = settings.email ? `mailto:${settings.email}` : "/contact";
  return (
    <footer className="footer">
      <div className="container">
        <a href={href} className="footer-cta">Let&apos;s talk</a>
        <div className="footer-row">
          <span>© {year} {settings.wordmark}. {settings.location}</span>
          <nav aria-label="Footer">
            <Link href="/#work">Work</Link>
            <Link href="/about">About</Link>
            {settings.links.filter((l) => l.url).map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
