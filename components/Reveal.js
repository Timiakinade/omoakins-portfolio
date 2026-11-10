"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Aliyu's reveal: elements with .reveal fade and rise in as they enter the viewport.
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = [...document.querySelectorAll(".reveal:not(.in)")];
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
