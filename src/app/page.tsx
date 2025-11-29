import HeaderNavigation from "@/components/sections/header-navigation";
import HeroSection from "@/components/sections/hero-section";
import TechnologyOverview from "@/components/sections/technology-overview";
import AppsShowcase from "@/components/sections/apps-showcase";
import NarrativeCapabilities from "@/components/sections/narrative-capabilities";
import ResearchShowcase from "@/components/sections/research-showcase";
import StudiosFeature from "@/components/sections/studios-feature";
import CustomerStories from "@/components/sections/customer-stories";
import FooterCta from "@/components/sections/footer-cta";
import FooterNavigation from "@/components/sections/footer-navigation";

export default function HomePage() {
  return (
    <>
      <HeaderNavigation />
      
      <main className="min-h-screen">
        <HeroSection />
        
        <TechnologyOverview />
        
        <AppsShowcase />
        
        <NarrativeCapabilities />
        
        <ResearchShowcase />
        
        <StudiosFeature />
        
        <CustomerStories />
        
        <FooterCta />
      </main>
      
      <FooterNavigation />
    </>
  );
}