"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const DARK = "#121111";

// Hero: giant name ticker behind the portrait (difference blend), nav row, socials,
// role lines, and a pixel dissolve that darkens the hero from the bottom as you scroll out.
export default function Hero({ name, portrait, roles = [], links = [], socials = [] }) {
  const root = useRef(null);
  const track = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    const tr = track.current;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    let raf = 0, unit = 0, last = performance.now(), sm = window.scrollY;
    let W = 0, H = 0, cell = 40, cols = 0, rows = 0, rnd = new Float32Array(0), dpr = 1, drawQueued = false;

    const measure = () => { const f = tr.firstElementChild; if (f) unit = f.getBoundingClientRect().width; };

    const draw = () => {
      drawQueued = false;
      const p = Math.max(0, Math.min(1, window.scrollY / H));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const f = p * 1.25 - 0.1;
      if (f <= 0) return;
      ctx.fillStyle = DARK;
      for (let r = 0; r < rows; r++) {
        const t = (rows - 1 - r + 0.5) / rows; // 0 at the bottom, 1 at the top
        for (let c = 0; c < cols; c++) {
          if (f - t * 0.75 > rnd[r * cols + c] * 0.35) ctx.fillRect(c * cell, r * cell, cell + 0.6, cell + 0.6);
        }
      }
    };
    const queueDraw = () => { if (!drawQueued) { drawQueued = true; requestAnimationFrame(draw); } };

    const size = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cell = Math.max(28, Math.round(W / 26));
      cols = Math.ceil(W / cell); rows = Math.ceil(H / cell);
      rnd = Float32Array.from({ length: cols * rows }, () => Math.random());
      measure();
      draw();
    };

    // The name tracks the scroll: it only moves when you scroll, easing toward its target (about 0.6px per px scrolled).
    const loop = (now) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      const y = window.scrollY;
      sm += (y - sm) * Math.min(1, dt * 7);
      if (!reduce && y < H * 1.2 && unit) {
        const pos = -(sm * 0.6) - unit * 0.18;
        const tx = (pos % unit) - (pos % unit > 0 ? unit : 0);
        tr.style.transform = `translate3d(${tx}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    size();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", size);
    window.addEventListener("scroll", queueDraw, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("scroll", queueDraw); };
  }, []);

  return (
    <section className="hx-hero" ref={root} aria-label="Introduction">
      <h1 className="hx-sr">{name}, {roles.join(" and ").toLowerCase()}</h1>
      {portrait && <img className="hx-photo" src={portrait} alt={`Portrait of ${name}`} fetchPriority="high" />}

      <div className="hx-ticker" aria-hidden="true">
        <div className="hx-track" ref={track}>
          {Array.from({ length: 6 }).map((_, i) => <span key={i}>{name}<i className="hx-dot" /></span>)}
        </div>
      </div>

      <nav className="hx-nav" aria-label="Home">
        <span>© {name}</span>
        <div className="hx-links">{links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
      </nav>

      {socials.length > 0 && (
        <ul className="hx-socials">
          {socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
        </ul>
      )}
      <p className="hx-role">{roles.map((r) => <span key={r}>{r}</span>)}</p>

      <canvas className="hx-pixels" ref={canvas} aria-hidden="true" />
    </section>
  );
}
