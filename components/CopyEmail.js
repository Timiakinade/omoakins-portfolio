"use client";

import { useState } from "react";
import { Copy, Check } from "./Icons";

// Tariq's email pill: one click copies, label flips to "Email copied!".
export default function CopyEmail({ email }) {
  const [done, setDone] = useState(false);
  if (!email) return <span className="copy-pill" aria-disabled="true">Email coming soon</span>;
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setDone(true); setTimeout(() => setDone(false), 1800); }
    catch { window.location.href = `mailto:${email}`; }
  };
  return (
    <button type="button" className="copy-pill" onClick={copy} aria-live="polite">
      <span>{done ? "Email copied!" : email}</span>{done ? <Check /> : <Copy />}
    </button>
  );
}
