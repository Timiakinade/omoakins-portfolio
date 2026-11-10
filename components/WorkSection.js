"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import WorkCard from "./WorkCard";

const ORDER = ["product", "campaigns", "brand-comms"];

// Tsolaye's selected work with the filter in the URL (?category=product).
// The filter row stays hidden until two or more categories have work.
export default function WorkSection({ studies, categories, subgroups }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const present = ORDER.filter((c) => studies.some((s) => s.category === c));
  const showFilter = present.length >= 2;
  const requested = params.get("category");
  const active = showFilter && present.includes(requested) ? requested : "all";

  const setActive = (value) => {
    const next = new URLSearchParams(params.toString());
    value === "all" ? next.delete("category") : next.set("category", value);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}#work`, { scroll: false });
  };

  // Newly shown cards after a filter change should be visible straight away.
  useEffect(() => { document.querySelectorAll("#work .reveal").forEach((e) => e.classList.add("in")); }, [active]);

  const visible = active === "all" ? studies : studies.filter((s) => s.category === active);
  const cat = active === "all" ? null : categories[active];
  const groups = active === "all"
    ? [{ key: "", items: visible }]
    : [...new Set(visible.map((s) => s.subgroup || ""))].sort((a, b) => (a === "") - (b === "")).map((key) => ({ key, items: visible.filter((s) => (s.subgroup || "") === key) }));

  let n = 0;
  return (
    <section id="work" className="container work" aria-labelledby="work-title">
      <div className="work-head">
        <div>
          <h2 id="work-title" className="section-title">{cat ? cat.heading : "Selected work"}</h2>
          <p>{cat?.tagline || "Research led case studies, each with its own look."}</p>
        </div>
        {showFilter && (
          <div className="filters" role="group" aria-label="Filter projects">
            <button type="button" className="filter" aria-pressed={active === "all"} onClick={() => setActive("all")}>All</button>
            {present.map((c) => (
              <button key={c} type="button" className="filter" aria-pressed={active === c} onClick={() => setActive(c)}>{categories[c]?.button || c}</button>
            ))}
          </div>
        )}
      </div>
      {groups.map((g) => (
        <div key={g.key || "all"}>
          {g.key && subgroups[g.key] && (
            <div className="subgroup-head"><h3>{subgroups[g.key].heading}</h3>{subgroups[g.key].tagline && <p>{subgroups[g.key].tagline}</p>}</div>
          )}
          <div className="rows">{g.items.map((s) => <WorkCard key={s.slug} study={s} index={n++} />)}</div>
        </div>
      ))}
    </section>
  );
}
