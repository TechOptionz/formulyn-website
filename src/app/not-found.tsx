import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error · 404"
        heading="That page isn't on the shelf"
        body="The link may be out of date. Head back to the homepage, or start a brief and tell us what you're trying to make."
        headingMeasure={16}
      />
      <CtaBanner />
    </>
  );
}
