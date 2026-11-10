// Free ratio image frame. Empty src renders a sized placeholder with its caption,
// so a layout holds before the real export is uploaded.
export default function Frame({ src, alt = "", ratio = 1.6, label, children, className = "" }) {
  const style = { aspectRatio: String(ratio || 1.6) };
  if (src) {
    return (
      <div className={`frame ${className}`} style={style}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`frame ${children ? "" : "frame-empty"} ${className}`} style={style} role="img" aria-label={alt || label}>
      {children || <span>{label || alt || "Image"}</span>}
    </div>
  );
}
