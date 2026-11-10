"use client";

import { useEffect, useRef, useState } from "react";
import Frame from "../Frame";

export default function Slider({ items = [] }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const move = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * Math.max(256, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="b-slider">
      <div className="slider-track" ref={track} tabIndex={0} aria-label="Screens">
        {items.map((item, i) => (
          <figure key={i} className="slide" style={{ margin: 0 }}>
            <Frame src={item.src} alt={item.alt} ratio={item.ratio || 0.46} label={item.caption} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <div className="slider-nav">
        <button type="button" onClick={() => move(-1)} disabled={edge.start} aria-label="Previous screens">←</button>
        <button type="button" onClick={() => move(1)} disabled={edge.end} aria-label="Next screens">→</button>
      </div>
    </div>
  );
}
