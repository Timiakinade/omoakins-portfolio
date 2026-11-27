import Link from "next/link";
import ScrollText from "./ScrollText";

export default function Intro({ lead, soft, cta }) {
  return (
    <section className="hx-dark hx-intro" id="intro" aria-labelledby="intro-h">
      <div className="hx-label"><i>//</i><span id="intro-h">Short story</span></div>
      <ScrollText className="hx-statement" parts={[{ text: lead, tone: "ink" }, { text: soft, tone: "ink" }]} />
      <div className="hx-intro-body">
        <Link href="/#work" className="hx-pill">{cta}</Link>
      </div>
    </section>
  );
}
