import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { ManifestoSection } from "@/components/sections/home/ManifestoSection";
import { SituationsSection } from "@/components/sections/home/SituationsSection";
import { PracticeSection } from "@/components/sections/home/PracticeSection";
import { CaseStudiesSection } from "@/components/sections/home/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title:
    "Nutraceutical & Cosmetic Formulation Consultancy | TGA, EU & UK | Formulyn",
  description: site.description,
  // Already ends in the brand name; the layout's `%s — Formulyn` template
  // would otherwise append it twice.
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ManifestoSection />
      <SituationsSection />
      <PracticeSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
