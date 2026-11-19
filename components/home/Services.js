"use client";

import { useEffect, useRef, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

// Services: one big outlined number stays pinned on the left and changes as each group scrolls past.
export default function Services({ items = [] }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section className="hx-dark hx-services" id="services" aria-labelledby="services-h">
      <div className="hx-label"><i>//</i><span id="services-h">Services</span></div>
      <div className="hx-svc">
        <div className="hx-svc-numcol" aria-hidden="true">
          <div className="hx-num" key={active}>{pad(active + 1)}</div>
        </div>
        <div className="hx-svc-list">
          {items.map((g, i) => (
            <article key={g.title} className="hx-group" data-i={i} ref={(el) => (refs.current[i] = el)}>
              <div className="hx-num hx-num-m" aria-hidden="true">{pad(i + 1)}</div>
              <h2>{g.title}</h2>
              <p className="hx-desc">{g.body}</p>
              <ul className="hx-rows">
                {g.items.map((it, j) => (
                  <li key={it} className="hx-row"><span>{it}</span><span className="n">{pad(j + 1)}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
