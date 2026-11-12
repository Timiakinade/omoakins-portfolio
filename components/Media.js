// Free ratio media. Empty src renders a sized placeholder with its label,
// so layouts hold before real exports are uploaded.
export default function Media({ src, alt = "", ratio = 1.6, label, children, className = "", style, eager }) {
  const s = { aspectRatio: String(ratio || 1.6), ...style };
  if (src) return <div className={`media ${className}`} style={s}><img src={src} alt={alt} loading={eager ? "eager" : "lazy"} /></div>;
  return (
    <div className={`media ${children ? "" : "empty"} ${className}`} style={s} role="img" aria-label={alt || label}>
      {children || <span>{label || alt || "Image"}</span>}
    </div>
  );
}
