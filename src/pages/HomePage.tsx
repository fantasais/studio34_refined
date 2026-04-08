import BuiltBeyondSection from "../components/BuiltBeyondSection";
import CountdownSection from "../components/CountdownSection";
import CtaSection from "../components/CtaSection";
import HeroStackedCards from "../components/HeroStackedCards";
import ServicesSection from "../components/ServicesSection";
import StudioStorySection from "../components/StudioStorySection";
import WorkSection from "../components/WorkSection";

export default function HomePage() {
  return (
    <main>
      <HeroStackedCards />
      <CountdownSection />
      <BuiltBeyondSection />
      <ServicesSection />
      <StudioStorySection />
      <WorkSection />
      <CtaSection />
    </main>
  );
}
