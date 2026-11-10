import Link from "next/link";
import CopyEmail from "./CopyEmail";

// Tariq's footer with Aliyu's link row underneath.
export default function Footer({ settings }) {
  const socials = settings.socials.filter((s) => s.url);
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <p className="footer-ask">Ready for the work?</p>
        <a href={settings.email ? `mailto:${settings.email}` : "/contact"} className="footer-big">Let&apos;s talk</a>
        <div className="footer-panel">
          <span className="handle h-tl" /><span className="handle h-tr" /><span className="handle h-bl" /><span className="handle h-br" />
          <div>
            <h3>{settings.availability}</h3>
            <CopyEmail email={settings.email} />
          </div>
          {socials.length > 0 && (
            <div>
              <h3>Connect on socials</h3>
              <div className="socials">
                {socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}
              </div>
            </div>
          )}
        </div>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} {settings.wordmark} · {settings.location}</span>
          <nav aria-label="Footer">
            <Link href="/#work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            {settings.resume && <a href={settings.resume} target="_blank" rel="noreferrer">Resume</a>}
          </nav>
        </div>
      </div>
    </footer>
  );
}
