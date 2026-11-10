"use client";

import { useEffect, useRef, useState } from "react";
import Media from "../Media";

// Aliyu's pinned gallery: the stage sticks while vertical scroll moves the row sideways.
// Falls back to a swipeable row on small screens and with reduced motion.
export default function PinGallery({ items = [] }) {
  const wrap = useRef(null);
  const track = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      const on = mq.matches && track.current && track.current.scrollWidth > track.current.parentElement.clientWidth;
      setPinned(on);
      if (on) setHeight(track.current.scrollWidth - track.current.parentElement.clientWidth + window.innerHeight);
      else { setHeight(null); if (track.current) track.current.style.transform = ""; }
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener?.("change", measure);
    return () => { window.removeEventListener("resize", measure); mq.removeEventListener?.("change", measure); };
  }, [items.length]);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrap.current, tr = track.current;
        if (!el || !tr) return;
        const dist = tr.scrollWidth - tr.parentElement.clientWidth;
        const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, el.offsetHeight - window.innerHeight)));
        tr.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [pinned, height]);

  return (
    <div ref={wrap} className={`pin ${pinned ? "" : "static"}`} style={height ? { height } : undefined}>
      <div className="pin-stage">
        <div className="pin-track" ref={track}>
          {items.map((it, i) => (
            <figure key={i} className="slide">
              <Media src={it.src} alt={it.alt} ratio={it.ratio || 0.46} label={it.caption} />
              {it.caption && <figcaption>{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
        <span className="pin-hint" aria-hidden="true">{pinned ? "Keep scrolling →" : "Swipe for more →"}</span>
      </div>
    </div>
  );
}
