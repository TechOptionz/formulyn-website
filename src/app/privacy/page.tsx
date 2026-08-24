import { privacyHero } from "@/data/privacy";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PolicySections } from "@/components/sections/privacy/PolicySections";
import { CtaBanner } from "@/components/layout/CtaBanner";

/**
 * Also serves as the privacy policy URL declared on the Formulyn LinkedIn
 * developer app, so the route has to stay at /privacy.
 */
export const metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy | Formulyn",
  description:
    "Formulyn's company policies: how a project runs, confidentiality and NDAs, intellectual property ownership, manufacturing independence, cancellations, regulatory guidance, and how we handle your data and privacy.",
  // Already names the brand; the template would append it a second time.
  absoluteTitle: true,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Privacy Policy", path: "/privacy" }])}
      />
      <PageHero
        eyebrow={privacyHero.eyebrow}
        heading={privacyHero.heading}
        body={privacyHero.body}
        headingMeasure={20}
        // A policy masthead, not a display hero: set at the section-heading
        // size rather than the full 80px the marketing pages carry.
        headingSize="clamp(32px, 4vw, 52px)"
      />
      <PolicySections />
      <CtaBanner />
    </>
  );
}
