import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Regular.otf", weight: "400" },
    { path: "../../public/fonts/Satoshi-Medium.otf", weight: "500" },
    { path: "../../public/fonts/Satoshi-Bold.otf", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.midasfocus.com"),
  title: {
    default: "Midas Focus | Science of Focus & Mental Performance",
    template: "%s | Midas Focus",
  },
  description:
    "Explore the neuroscience of focus, attention training, and mental performance. Research-backed strategies to sharpen your mind.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Midas Focus Blog",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <header className="border-b border-card-border">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <a href="https://midasfocus.com" className="group flex items-center gap-2">
              <span className="font-[family-name:var(--font-instrument)] text-xl text-gold">
                Midas
              </span>
            </a>
            <a
              href="https://midasfocus.com"
              className="text-sm text-gold-dim transition-colors hover:text-gold"
            >
              Get the App
            </a>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>

        <footer className="border-t border-card-border mt-auto">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-[family-name:var(--font-instrument)] text-lg text-gold-dim">
                Midas Focus
              </span>
              <p className="text-sm text-neutral-500">
                Train your brain to focus. Backed by neuroscience.
              </p>
              <a
                href="https://midasfocus.com"
                className="mt-2 text-sm text-gold-dim transition-colors hover:text-gold"
              >
                midasfocus.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
