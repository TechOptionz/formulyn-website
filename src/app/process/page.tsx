import type { Metadata } from "next";
import { processHero } from "@/data/process";
import { PageHero } from "@/components/ui/PageHero";
import { PhasesSection } from "@/components/sections/process/PhasesSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "The Process",
  description: processHero.body,
};

export default function ProcessPage() {
  return (
    <>
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
