import type { Metadata } from "next";
import { servicesHero } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Services",
  description: servicesHero.body,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        heading={servicesHero.heading}
        body={servicesHero.body}
        headingMeasure={16}
      />
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
