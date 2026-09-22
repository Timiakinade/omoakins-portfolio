/* Small bits of interactivity. Pages are complete without this script;
   it only adds the menu, filters, scroll reveal and the contact form behaviour. */

/* ---------- mobile menu ---------- */
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  menuBtn.setAttribute("aria-expanded", String(open));
});

/* ---------- filters ----------
   <div data-filters="grid-id" data-limit="6" data-feature-first> chips with data-filter="…"
   The grid holds every tile (data-cat) plus an .empty element. */
document.querySelectorAll<HTMLElement>("[data-filters]").forEach((bar) => {
  const grid = document.getElementById(bar.dataset.filters!);
  if (!grid) return;
  const tiles = [...grid.querySelectorAll<HTMLElement>("[data-cat]")];
  const empty = grid.querySelector<HTMLElement>(".empty");
  const count = document.querySelector<HTMLElement>(`[data-count-for="${grid.id}"]`);
  const limit = Number(bar.dataset.limit) || Infinity;
  const featureFirst = bar.hasAttribute("data-feature-first");

  function apply(filter: string) {
    const all = filter === "all";
    const shown = tiles.filter((t) => all || t.dataset.cat === filter).slice(0, limit);
    tiles.forEach((t) => {
      t.hidden = !shown.includes(t);
      // The wide "featured" tile only makes sense in the unfiltered bento.
      if (featureFirst) t.classList.toggle("featured", all && t === shown[0] && t.dataset.featured === "true");
    });
    if (empty) empty.hidden = shown.length > 0;
    if (count) {
      const n = shown.length;
      count.textContent = `${String(n).padStart(2, "0")} project${n === 1 ? "" : "s"} · ${count.dataset.years}`;
    }
  }

  bar.querySelectorAll<HTMLElement>("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      bar.querySelectorAll("[data-filter]").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-pressed", "true");
      apply(chip.dataset.filter!);
    });
  });
});

/* ---------- reveal on scroll (degrades to visible) ---------- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

/* ---------- contact form (front-end only until phase 3 wires the inbox) ---------- */
const form = document.getElementById("contactForm") as HTMLFormElement | null;
if (form) {
  const types = document.getElementById("projTypes")!;
  types.querySelectorAll<HTMLElement>(".chip").forEach((ch) =>
    ch.addEventListener("click", () => {
      types.querySelectorAll(".chip").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-pressed", "false");
      });
      ch.classList.add("active");
      ch.setAttribute("aria-pressed", "true");
    }),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("formNote")!;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!name || !email || !/.+@.+\..+/.test(email)) {
      note.textContent = "Add your name and a valid email and I'll get it.";
      return;
    }
    note.textContent = `Thanks ${name.split(" ")[0]} — message ready. Hook this form to your inbox or Formspree to send for real.`;
    form.querySelector(".submit")!.textContent = "Sent ✓";
  });
}
