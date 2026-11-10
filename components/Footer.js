import Link from "next/link";
import CopyEmail from "./CopyEmail";
import Button from "./Button";
import LocalTime from "./LocalTime";

export default function Footer({ settings }) {
  const socials = settings.socials.filter((s) => s.url);
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-cta">
          <p className="footer-big">Got something<br /><span className="accent">to build?</span></p>
          <div className="footer-actions">
            <CopyEmail email={settings.email} />
            <Button href={settings.email ? `mailto:${settings.email}` : "/contact"}>Start a conversation</Button>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h4>Pages</h4>
            <ul><li><Link href="/#work">Work</Link></li><li><Link href="/about">About</Link></li><li><Link href="/contact">Contact</Link></li>{settings.resume && <li><a href={settings.resume} target="_blank" rel="noreferrer">Resume</a></li>}</ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>{socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>)}</ul>
          </div>
          <div>
            <h4>{settings.location}</h4>
            <ul><li className="muted"><LocalTime timezone={settings.timezone} /> local time</li><li className="muted">© {new Date().getFullYear()} {settings.wordmark}</li></ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
