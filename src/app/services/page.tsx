import { servicesHero } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata = pageMetadata({
  path: "/services",
  title: "Supplement & Skincare Formulation Services | Fixed-Scope",
  description: servicesHero.body,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Services", path: "/services" }])}
      />
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
