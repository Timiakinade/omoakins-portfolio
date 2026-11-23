import Link from "next/link";
import ScrollText from "./ScrollText";

export default function Intro({ lead, soft, body, cta }) {
  return (
    <section className="hx-dark hx-intro" id="intro" aria-labelledby="intro-h">
      <div className="hx-label"><i>//</i><span id="intro-h">Intro</span></div>
      <ScrollText className="hx-statement" parts={[{ text: lead, tone: "ink" }, { text: soft, tone: "soft" }]} />
      <div className="hx-intro-body">
        <p>{body}</p>
        <Link href="/#work" className="hx-pill">{cta}</Link>
      </div>
    </section>
  );
}
