import type { Metadata } from "next";
import { journalHero } from "@/data/journal";
import { PageHero } from "@/components/ui/PageHero";
import { JournalSection } from "@/components/sections/journal/JournalSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Journal",
  description: journalHero.body,
};

export default function JournalPage() {
  return (
    <>
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
