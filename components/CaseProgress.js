"use client";

import { useEffect, useRef, useState } from "react";

// Top reading line (Iyanu) plus a sticky numbered sidebar with a percentage (Ayo Uzo).
export default function CaseProgress({ sections }) {
  const line = useRef(null);
  const [active, setActive] = useState(sections[0]?.id);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const content = document.querySelector(".cs-content");
        if (!content) return;
        const rect = content.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.5;
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / Math.max(1, total)));
        if (line.current) line.current.style.transform = `scaleX(${p})`;
        setPct(Math.round(p * 100));

        let current = sections[0]?.id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [sections]);

  // Keep the active chip in view on the mobile strip.
  useEffect(() => {
    const chip = document.querySelector(`.cs-side a[href="#${active}"]`);
    const strip = chip?.closest("ol");
    if (chip && strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({ left: chip.offsetLeft - 20, behavior: "smooth" });
    }
  }, [active]);

  return (
    <>
      <div className="progress-line" ref={line} aria-hidden="true" />
      <nav className="cs-side" aria-label="Case study sections">
        <span className="pct">{String(pct).padStart(2, "0")}% read</span>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? "active" : ""} aria-current={active === s.id ? "true" : undefined}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span>{s.label || s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
