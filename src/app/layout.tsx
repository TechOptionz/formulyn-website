import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { PageTransition } from "@/components/ui/PageTransition";
import { RouteRestartProvider } from "@/components/ui/RouteRestart";
import { site } from "@/data/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_AU",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    site: "@formulyn",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${inter.variable}`}>
      <body>
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
