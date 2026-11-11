"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, User, Grid, Mail, Sun, Moon } from "./Icons";

// Tariq's dock: fixed bottom centre, icon buttons with tooltips.
const ITEMS = [
  { href: "/", label: "Home", Icon: Home, match: (p) => p === "/" },
  { href: "/#work", label: "Work", Icon: Grid, match: (p) => p.startsWith("/work") },
  { href: "/about", label: "About", Icon: User, match: (p) => p.startsWith("/about") },
  { href: "/contact", label: "Contact", Icon: Mail, match: (p) => p.startsWith("/contact") },
];

export default function Dock() {
  const path = usePathname() || "/";
  const [theme, setTheme] = useState("light");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"); }, []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    window.clearTimeout(window.__themeT);
    window.__themeT = window.setTimeout(() => root.classList.remove("theme-anim"), 700);
    try { localStorage.setItem("theme", next); } catch (e) {}
    setTheme(next);
  };
  return (
    <nav className="dock" aria-label="Main">
      {ITEMS.map(({ href, label, Icon, match }) => (
        <Link key={label} href={href} aria-label={label} aria-current={match(path) ? "page" : undefined}>
          <Icon />
          <span className="tip" aria-hidden="true">{label}</span>
        </Link>
      ))}
      <button type="button" onClick={flip} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
        {theme === "dark" ? <Sun /> : <Moon />}
        <span className="tip" aria-hidden="true">{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </nav>
  );
}
