"use client";
import { useEffect, useState } from "react";

// A tall image shows as a capped preview, with an Expand button.
// Expanding opens the full image in a scrollable viewer.
export default function ExpandImage({ src, alt = "", label = "Expand" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <div className="expand">
        <img src={src} alt={alt} loading="lazy" onClick={() => setOpen(true)} />
        <div className="expand-fade" aria-hidden="true" />
        <button type="button" className="expand-btn" onClick={() => setOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          {label}
        </button>
      </div>
      {open && (
        <div className="viewer" role="dialog" aria-modal="true" aria-label={alt || "Full image"} onClick={() => setOpen(false)}>
          <button type="button" className="viewer-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="viewer-scroll" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  );
}
