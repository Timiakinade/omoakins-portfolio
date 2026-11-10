import Link from "next/link";

export default function Nav({ wordmark }) {
  return (
    <header className="nav">
      <div className="container">
        <Link href="/" className="wordmark" aria-label={`${wordmark}, home`}>{wordmark}</Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
