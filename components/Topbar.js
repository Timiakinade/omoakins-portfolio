import Link from "next/link";
export default function Topbar({ wordmark }) {
  return <div className="topbar"><Link href="/" aria-label={`${wordmark}, home`}>{wordmark}</Link></div>;
}
