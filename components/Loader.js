"use client";

import { useEffect, useRef, useState } from "react";

// First visit per session: a counter on a black sheet, then three monochrome sheets
// (black, grey, white) flap away in different directions to reveal the page.
const COUNT_MS = 1100;
const FLAP_MS = 1500;

export default function Loader({ label = "Portfolio" }) {
  const root = useRef(null);
  const num = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try { seen = sessionStorage.getItem("loaded") === "1"; } catch (e) {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { setGone(true); return; }

    html.classList.add("loading");
    const timers = [];
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      const eased = 1 - Math.pow(1 - p, 2.2);
      if (num.current) num.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        timers.push(setTimeout(() => root.current && root.current.classList.add("go"), 160));
        timers.push(setTimeout(finish, 160 + FLAP_MS));
      }
    };
    const finish = () => {
      html.classList.remove("loading");
      try { sessionStorage.setItem("loaded", "1"); } catch (e) {}
      setGone(true);
    };
    raf = requestAnimationFrame(tick);
    timers.push(setTimeout(finish, 6000));
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); html.classList.remove("loading"); };
  }, []);

  if (gone) return null;
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="lp lp-white" />
      <div className="lp lp-grey" />
      <div className="lp lp-black">
        <span className="loader-label">{label}</span>
        <span className="loader-num" ref={num}>000</span>
      </div>
    </div>
  );
}
