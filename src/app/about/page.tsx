import { aboutBody, aboutHero } from "@/data/about";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { PrinciplesSection } from "@/components/sections/about/PrinciplesSection";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Formulyn | Independent Formulation R&D, Brisbane",
  description: aboutBody.lead,
  // Already names the brand; the template would append it twice.
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <>
      {/* The Organization and Person nodes this page used to carry are now
          emitted site-wide from the root layout, so only the trail is left. */}
      <JsonLd node={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow={aboutHero.eyebrow}
        heading={aboutHero.heading}
        headingMeasure={18}
      />
      <AboutSection />
      <PrinciplesSection />
      <LeadershipSection />
      <CtaBanner />
    </>
  );
}
