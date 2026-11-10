import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/data";

export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: { default: `${s.wordmark}, ${s.role}`, template: `%s | ${s.wordmark}` },
    description: s.intro,
  };
}

const FONTS =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Space+Mono&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500&family=Sora:wght@400;500&display=swap";

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <a href="#main" className="sr-only">Skip to content</a>
        <Nav wordmark={settings.wordmark} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
