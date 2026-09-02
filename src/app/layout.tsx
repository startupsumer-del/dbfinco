import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { HEADER_LOGO_SRC, HEADER_WORDMARK_SRC } from "@/components/brand/Logo";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import { Header } from "@/components/navigation/Header";
import { site } from "@/config/site";
import { organizationSchema } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        {/* The header logo is above the fold on every route, so both the
            compact and full variants are preloaded to avoid a visible pop. */}
        <link rel="preload" as="image" type="image/svg+xml" href={HEADER_WORDMARK_SRC} />
        <link rel="preload" as="image" type="image/svg+xml" href={HEADER_LOGO_SRC} />
      </head>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        <a
          href="#main"
          className="sr-only rounded-md bg-purple-900 px-4 py-3 text-sm font-semibold
            text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        {/* Runs at the end of the body, so the DOM is parsed but nothing has
            painted yet. It does two things: marks the document, which is what
            switches the scroll-reveal styles on at all, and exempts every
            block already on screen so the first view never fades in.

            With JavaScript disabled neither happens, the marker class is
            absent, and every section renders plainly visible — which is the
            correct fallback rather than a degraded one. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var r=document.documentElement;r.classList.add("js-reveal");' +
              'var h=window.innerHeight,e=document.querySelectorAll("[data-reveal]");' +
              'for(var i=0;i<e.length;i++){if(e[i].getBoundingClientRect().top<h)' +
              'e[i].setAttribute("data-reveal","ready");}})()',
          }}
        />
      </body>
    </html>
  );
}
