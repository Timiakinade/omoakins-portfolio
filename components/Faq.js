"use client";

import { useState } from "react";

// Iyanu's FAQ: centred column, category tabs, card accordion.
export default function Faq({ items = [], categories = [], title = "FAQ", intro = "Answers to common questions about my work, process and availability." }) {
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  const cats = categories.filter((c) => items.some((i) => i.cat === c.id));
  const shown = tab === "all" ? items : items.filter((i) => i.cat === tab);
  return (
    <section id="faq" className="container faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <div className="faq-head reveal">
          <h2 id="faq-title" className="eyebrow">{title}</h2>
          <p>{intro}</p>
        </div>
        {cats.length > 1 && (
          <div className="faq-tabs" role="group" aria-label="FAQ topics">
            <button type="button" className="filter" aria-pressed={tab === "all"} onClick={() => setTab("all")}>All FAQs</button>
            {cats.map((c) => <button key={c.id} type="button" className="filter" aria-pressed={tab === c.id} onClick={() => setTab(c.id)}>{c.label}</button>)}
          </div>
        )}
        <div className="faq-list">
          {shown.map((item) => {
            const isOpen = open === item.q;
            const id = `faq-${item.q.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : item.q)}>
                  {item.q}<span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-a" id={id} role="region"><div><p>{item.a}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
