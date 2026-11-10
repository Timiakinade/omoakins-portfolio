"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import WorkCard from "./WorkCard";

const ORDER = ["product", "campaigns", "brand-comms"];

export default function WorkSection({ studies, categories, subgroups }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const present = ORDER.filter((c) => studies.some((s) => s.category === c));
  // Filter stays hidden until at least two categories have work in them.
  const showFilter = present.length >= 2;
  const requested = params.get("category");
  const active = showFilter && present.includes(requested) ? requested : "all";

  const setActive = (value) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("category");
    else next.set("category", value);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}#work`, { scroll: false });
  };

  const visible = active === "all" ? studies : studies.filter((s) => s.category === active);
  const cat = active === "all" ? null : categories[active];

  // Inside a filtered view, group by subgroup; ungrouped work comes last.
  const groups = [];
  if (active !== "all") {
    const keys = [...new Set(visible.map((s) => s.subgroup || ""))].sort((a, b) => (a === "") - (b === ""));
    for (const key of keys) groups.push({ key, items: visible.filter((s) => (s.subgroup || "") === key) });
  } else {
    groups.push({ key: "", items: visible });
  }
  const multipleGroups = groups.length > 1 || (groups[0] && groups[0].key);

  let n = 0;
  return (
    <section id="work" aria-labelledby="work-title" style={{ scrollMarginTop: 96 }}>
      <div className="work-head">
        <div>
          <h2 id="work-title">{cat ? cat.heading : "My projects"}</h2>
          {cat?.tagline && <p>{cat.tagline}</p>}
        </div>
        {showFilter && (
          <div className="filters" role="group" aria-label="Filter projects">
            <button type="button" className="filter" aria-pressed={active === "all"} onClick={() => setActive("all")}>All</button>
            {present.map((c) => (
              <button key={c} type="button" className="filter" aria-pressed={active === c} onClick={() => setActive(c)}>
                {categories[c]?.button || c}
              </button>
            ))}
          </div>
        )}
      </div>
      {groups.map((g) => (
        <div key={g.key || "ungrouped"}>
          {multipleGroups && g.key && subgroups[g.key] && (
            <div className="subgroup-head">
              <h3>{subgroups[g.key].heading}</h3>
              {subgroups[g.key].tagline && <p>{subgroups[g.key].tagline}</p>}
            </div>
          )}
          <div className="cards">
            {g.items.map((s) => <WorkCard key={s.slug} study={s} index={n++} />)}
          </div>
        </div>
      ))}
    </section>
  );
}
