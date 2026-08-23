import { contactHero } from "@/data/contact";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description: contactHero.body,
});

/**
 * Contact deliberately omits the closing CTA banner — the page already is
 * the call to action.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Contact", path: "/contact" }])}
      />
      <ContactSection />
    </>
  );
}
