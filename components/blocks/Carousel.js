"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// A swipeable row of posts. Tap any slide to open it full screen, then use the
// arrows, swipe or the keyboard to move through the whole carousel.
export default function Carousel({ items = [], label = "Carousel" }) {
  const [open, setOpen] = useState(null);
  const row = useRef(null);
  const touch = useRef(null);
  const n = items.length;

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

  const nudge = (d) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="car">
      <div className="car-row" ref={row} role="list" aria-label={label}>
        {items.map((it, i) => (
          <button key={i} type="button" role="listitem" className="car-item" onClick={() => setOpen(i)} aria-label={`Open ${it.alt || `slide ${i + 1}`}, ${i + 1} of ${n}`}>
            <img src={it.src} alt={it.alt || ""} loading="lazy" />
          </button>
        ))}
      </div>
      <div className="car-bar">
        <span>{n} slides, tap to expand</span>
        <span className="car-arrows">
          <button type="button" onClick={() => nudge(-1)} aria-label="Scroll back">←</button>
          <button type="button" onClick={() => nudge(1)} aria-label="Scroll forward">→</button>
        </span>
      </div>
      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpen(null)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
          <button type="button" className="lb-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          <button type="button" className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">←</button>
          <img src={items[open].src} alt={items[open].alt || ""} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">→</button>
          <span className="lb-count">{open + 1} / {n}</span>
        </div>
      )}
    </div>
  );
}
