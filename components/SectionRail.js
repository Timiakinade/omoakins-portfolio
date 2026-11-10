"use client";

import { useEffect, useState } from "react";

// Iyanu's page rail: fixed right, labelled dots, hidden while the hero is on screen.
export default function SectionRail({ items }) {
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
      let cur = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = it.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav className={`rail ${show ? "" : "hide"}`} aria-label="Page sections">
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "active" : ""} aria-current={active === it.id ? "true" : undefined}>
              <span className="lbl">{it.label}</span><span className="dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
