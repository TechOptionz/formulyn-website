import { industriesHero } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { IndustryShowcase } from "@/components/sections/industries/IndustryShowcase";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata = pageMetadata({
  path: "/industries",
  title:
    "Formulation Expertise: Supplements, Skincare, Pet & Functional Food",
  description: industriesHero.body,
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Industries", path: "/industries" }])}
      />
      <PageHero
        eyebrow={industriesHero.eyebrow}
        heading={industriesHero.heading}
        body={industriesHero.body}
        headingMeasure={16}
      />
      <IndustryShowcase />
      <CtaBanner />
    </>
  );
}
