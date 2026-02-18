import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ValueSection from "@/components/ValueSection";
import FeaturesSection from "@/components/FeaturesSection";
import ParameterCarousel from "@/components/ParameterCarousel";
import WhyDifferent from "@/components/WhyDifferent";
import SecuritySection from "@/components/SecuritySection";
import DemoRequest from "@/components/DemoRequest";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <ValueSection />
      <ParameterCarousel />
      <FeaturesSection />
      <WhyDifferent />
      <SecuritySection />
      <DemoRequest />
      <Footer />
    </div>
  );
};

export default Index;
