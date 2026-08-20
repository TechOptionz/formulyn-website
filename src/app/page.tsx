import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { ManifestoSection } from "@/components/sections/home/ManifestoSection";
import { SituationsSection } from "@/components/sections/home/SituationsSection";
import { PracticeSection } from "@/components/sections/home/PracticeSection";
import { CaseStudiesSection } from "@/components/sections/home/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CtaBanner } from "@/components/layout/CtaBanner";

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
