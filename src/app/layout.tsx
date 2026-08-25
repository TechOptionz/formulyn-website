import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { PageTransition } from "@/components/ui/PageTransition";
import { RouteRestartProvider } from "@/components/ui/RouteRestart";
import { site } from "@/data/site";
import { siteLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import "@/styles/globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Site-wide defaults only.
 *
 * Deliberately carries no `alternates` and no per-page Open Graph values:
 * metadata is inherited by every route, so anything page-specific set here
 * silently becomes wrong everywhere it is not overridden. Each page builds
 * its own canonical and OG card through `pageMetadata` in lib/seo.ts.
 *
 * `twitter.site` is also gone — it declared @formulyn while no X account is
 * linked anywhere on the site, which reads as a dead handle.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${inter.variable}`}>
      <body>
        {/* The organisation, the founder and the site as one entity graph.
            Site-wide because it describes the business, not the page. */}
        <JsonLd node={siteLd} />
        {/* Spans the chrome as well as the page: the header and the footer are
            where a link back to the current route is most often clicked. */}
        <RouteRestartProvider>
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </RouteRestartProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
