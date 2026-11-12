"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page transition: clicking an internal link covers the screen with three monochrome
// sheets (grey, black, white, all wiping left to right), swaps the
// page underneath, then the sheets leave to the right, one after another.
const COVER_MS = 840;
const REVEAL_MS = 840;

export default function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const [state, setState] = useState("idle");
  const busy = useRef(false);
  const waiting = useRef(false);
  const timers = useRef([]);

  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduce.matches || busy.current) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      let url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      e.preventDefault();
      busy.current = true;
      setState("cover");
      later(() => { waiting.current = true; router.push(url.pathname + url.search + url.hash); }, COVER_MS);
      // failsafe: never leave the sheets up
      later(() => { if (busy.current) { waiting.current = false; setState("reveal"); later(done, REVEAL_MS); } }, 4500);
    };
    const done = () => { busy.current = false; waiting.current = false; setState("idle"); };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); timers.current.forEach(clearTimeout); };
  }, [router]);

  // new page is in: wait a beat, then lift the sheets
  useEffect(() => {
    if (!waiting.current) return;
    waiting.current = false;
    later(() => { setState("reveal"); later(() => { busy.current = false; setState("idle"); }, REVEAL_MS); }, 120);
  }, [path]);

  return (
    <div className="pt" data-state={state} aria-hidden="true">
      <div className="pt-s pt-grey" />
      <div className="pt-s pt-black" />
      <div className="pt-s pt-white" />
    </div>
  );
}
