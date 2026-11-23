"use client";

import { useEffect, useRef } from "react";

// Hero: giant name ticker behind the portrait (difference blend), socials and role lines.
// Scroll behaviour follows the reference: the name drifts on its own and is pushed by the scroll,
// the portrait travels slower than the page (parallax), the role lines slide in opposite directions.
export default function Hero({ name, portrait, portraitDark, roles = [], socials = [] }) {
  const root = useRef(null);
  const track = useRef(null);
  const photo = useRef(null);
  const role = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    const tr = track.current;
    const ph = photo.current;
    const lines = role.current ? Array.from(role.current.children) : [];
    let raf = 0, unit = 0, last = performance.now(), sm = window.scrollY, drift = 0, H = 1;

    const measure = () => { const f = tr.firstElementChild; if (f) unit = f.getBoundingClientRect().width; H = el.getBoundingClientRect().height || 1; };

    const loop = (now) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      const y = window.scrollY;
      sm += (y - sm) * Math.min(1, dt * 7);
      if (!reduce && y < H * 1.2 && unit) {
        drift += dt * unit * 0.1;
        const pos = -(sm * 0.6) - drift - unit * 0.18;
        const tx = (pos % unit) - (pos % unit > 0 ? unit : 0);
        tr.style.transform = `translate3d(${tx}px,0,0)`;
        ph.style.transform = `translate3d(0,${sm * 0.4}px,0)`;
        lines.forEach((l, i) => { l.style.transform = `translate3d(${(i % 2 === 0 ? -1 : 1) * sm * 0.12}px,0,0)`; });
      }
      raf = requestAnimationFrame(loop);
    };

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <section className="hx-hero" ref={root} aria-label="Introduction">
      <h1 className="hx-sr">{name}, {roles.join(" and ").toLowerCase()}</h1>
      <div className="hx-photo-wrap" ref={photo}>
        {portrait && <img className={`hx-photo ${portraitDark ? "is-light" : ""}`} src={portrait} alt={`Portrait of ${name}`} fetchPriority="high" />}
        {portraitDark && <img className="hx-photo is-dark" src={portraitDark} alt="" aria-hidden="true" fetchPriority="high" />}
      </div>

      <div className="hx-ticker" aria-hidden="true">
        <div className="hx-track" ref={track}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i}>{name}<i className="hx-dot" /></span>)}
        </div>
      </div>

      {socials.length > 0 && (
        <ul className="hx-socials">
          {socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
        </ul>
      )}
      <p className="hx-role" ref={role}>{roles.map((r) => <span key={r}>{r}</span>)}</p>
    </section>
  );
}
