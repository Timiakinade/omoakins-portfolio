"use client";

import { useState } from "react";

// Questions: title and topic filter on the left, hairline accordion on the right.
export default function Faq({ items = [], categories = [], title = "Questions", intro = "About the work, the process and availability." }) {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  const cats = categories.filter((c) => items.some((i) => i.cat === c.id));
  const shown = tab === "all" ? items : items.filter((i) => i.cat === tab);
  return (
    <section id="faq" className="container qa" aria-labelledby="faq-title">
      <div className="qa-side reveal">
        <h2 id="faq-title" className="section-title">{title}</h2>
        <p>{intro}</p>
        {cats.length > 1 && (
          <div className="qa-tabs" role="group" aria-label="Question topics">
            <button type="button" className="filter" aria-pressed={tab === "all"} onClick={() => setTab("all")}>All</button>
            {cats.map((c) => <button key={c.id} type="button" className="filter" aria-pressed={tab === c.id} onClick={() => setTab(c.id)}>{c.label}</button>)}
          </div>
        )}
      </div>
      <div className="qa-list">
        {shown.map((item) => {
          const isOpen = open === item.q;
          const id = `qa-${item.q.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <div key={item.q} className={`qa-item ${isOpen ? "open" : ""}`}>
              <button type="button" className="qa-q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : item.q)}>
                {item.q}<span className="plus" aria-hidden="true">+</span>
              </button>
              <div className="qa-a" id={id} role="region"><div><p>{item.a}</p></div></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
