"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Wraps a case study. Every image inside becomes one gallery: click or tap any of
// them to open it full screen, then swipe, use the arrows or the keyboard to move
// through the whole project. Turned off for product case studies (enabled prop).
export default function ProjectLightbox({ children, enabled = true }) {
  const root = useRef(null);
  const touch = useRef(null);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(null);
  const n = list.length;

  useEffect(() => {
    if (!enabled) return;
    const el = root.current;
    const onClick = (e) => {
      const img = e.target.closest?.("img");
      if (!img || !el.contains(img) || img.closest(".expand, .viewer, .lb, a, .prototype")) return;
      const all = Array.from(el.querySelectorAll("img")).filter((i) => i.currentSrc || i.src).filter((i) => !i.closest(".expand, a, .prototype"));
      const idx = all.indexOf(img);
      if (idx < 0) return;
      setList(all.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt || "" })));
      setOpen(idx);
    };
    el.addEventListener("click", onClick);
    el.querySelectorAll("img").forEach((i) => { i.style.cursor = "zoom-in"; });
    return () => el.removeEventListener("click", onClick);
  }, [enabled]);

  const go = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, go]);

  return (
    <div ref={root} data-pl={enabled ? "" : undefined}>
      {children}
      {open !== null && list[open] && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Project images" onClick={() => setOpen(null)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
          <button type="button" className="lb-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          <button type="button" className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image">←</button>
          <img src={list[open].src} alt={list[open].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image">→</button>
          <span className="lb-count">{open + 1} / {n}</span>
        </div>
      )}
    </div>
  );
}
