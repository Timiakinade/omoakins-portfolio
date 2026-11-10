import Link from "next/link";
import { Arrow } from "./Icons";

// Tariq's button: square, three colour layers wipe up in sequence on hover.
export default function Button({ href, children, ghost, external, icon, disabled, ...rest }) {
  const cls = `btn ${ghost ? "btn-ghost" : ""}`;
  const inner = (
    <>
      <span className="wipe" aria-hidden="true" />
      <span className="wipe" aria-hidden="true" />
      <span className="wipe" aria-hidden="true" />
      <span>{children}</span>
      <span className="ico" aria-hidden="true">{icon || <Arrow />}</span>
    </>
  );
  if (disabled || !href) return <span className={cls} aria-disabled="true" {...rest}>{inner}</span>;
  if (external || /^(https?:|mailto:)/.test(href)) {
    return <a className={cls} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" {...rest}>{inner}</a>;
  }
  return <Link className={cls} href={href} {...rest}>{inner}</Link>;
}
