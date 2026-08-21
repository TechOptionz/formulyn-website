import { journalHero } from "@/data/journal";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { JournalSection } from "@/components/sections/journal/JournalSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata = pageMetadata({
  path: "/journal",
  title: "Formulation Science & Regulatory Insights",
  description: journalHero.body,
});

export default function JournalPage() {
  return (
    <>
      <JsonLd
        node={breadcrumbLd([{ name: "Journal", path: "/journal" }])}
      />
      <PageHero
        eyebrow={journalHero.eyebrow}
        heading={journalHero.heading}
        body={journalHero.body}
        headingMeasure={16}
      />
      <JournalSection />
      <CtaBanner />
    </>
  );
}
