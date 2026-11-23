"use client";

import { useEffect, useRef } from "react";

// Scroll colour reveal: every character starts faint and fills to full ink as the paragraph
// scrolls up the screen, with a short mid grey edge leading the fill (the reference uses an accent there).
// `parts` is a list of { text, tone } where tone is "ink" or "soft" (soft settles on the muted grey).
export default function ScrollText({ parts, className = "" }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const chars = Array.from(el.querySelectorAll("[data-c]"));
    const n = chars.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, shown = -2, queued = false;

    const apply = (idx) => {
      // idx = number of characters fully revealed; the 10 after it form the leading edge
      for (let i = 0; i < n; i++) {
        const c = chars[i];
        const state = i < idx ? 2 : i < idx + 10 ? 1 : 0;
        if (c.__s !== state) { c.__s = state; c.dataset.s = state; }
      }
    };
    const update = () => {
      queued = false;
      if (reduce) { apply(n); return; }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // reveal starts when the top of the paragraph is at 70% of the viewport, ends at 22%
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / (vh * 0.48)));
      const idx = Math.round(p * (n + 10));
      if (idx !== shown) { shown = idx; apply(idx); }
    };
    const queue = () => { if (!queued) { queued = true; raf = requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);

  return (
    <p className={`sx ${className}`} ref={root}>
      {parts.map((part, pi) => (
        <span key={pi} className={`sx-${part.tone || "ink"}`}>
          {part.text.split(" ").map((w, wi, arr) => (
            <span key={wi}>
              <span className="sx-w">{Array.from(w).map((ch, ci) => <span key={ci} data-c data-s="0">{ch}</span>)}</span>
              {wi < arr.length - 1 ? " " : ""}
            </span>
          ))}{pi < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
