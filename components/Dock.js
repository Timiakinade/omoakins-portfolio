"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Grid, Mail } from "./Icons";

// Tariq's dock: fixed bottom centre, icon buttons with tooltips.
const ITEMS = [
  { href: "/", label: "Home", Icon: Home, match: (p) => p === "/" },
  { href: "/#work", label: "Work", Icon: Grid, match: (p) => p.startsWith("/work") },
  { href: "/about", label: "About", Icon: User, match: (p) => p.startsWith("/about") },
  { href: "/contact", label: "Contact", Icon: Mail, match: (p) => p.startsWith("/contact") },
];

export default function Dock() {
  const path = usePathname() || "/";
  return (
    <nav className="dock" aria-label="Main">
      {ITEMS.map(({ href, label, Icon, match }) => (
        <Link key={label} href={href} aria-label={label} aria-current={match(path) ? "page" : undefined}>
          <Icon />
          <span className="tip" aria-hidden="true">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
