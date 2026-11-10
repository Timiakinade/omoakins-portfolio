"use client";

import { useEffect, useRef, useState } from "react";

// Iyanu's 3px progress line + Aliyu's sticky numbered chapter list.
export default function CaseNav({ sections }) {
  const bar = useRef(null);
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        let cur = sections[0]?.id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [sections]);
  useEffect(() => {
    const chip = document.querySelector(`.chapters a[href="#${active}"]`);
    const strip = chip?.closest("ol");
    if (chip && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: chip.offsetLeft - 20, behavior: "smooth" });
  }, [active]);
  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <nav className="chapters" aria-label="Chapters">
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? "active" : ""} aria-current={active === s.id ? "true" : undefined}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span><span>{s.label || s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
