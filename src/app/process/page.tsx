import { processHero } from "@/data/process";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PhasesSection } from "@/components/sections/process/PhasesSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata = pageMetadata({
  path: "/process",
  title: "The Formulation Process: Brief to Manufacturer-Ready Dossier",
  description: processHero.body,
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Process", path: "/process" }])}
      />
      <PageHero
        eyebrow={processHero.eyebrow}
        heading={processHero.heading}
        body={processHero.body}
        headingMeasure={14}
      />
      <PhasesSection />
      <CtaBanner />
    </>
  );
}
