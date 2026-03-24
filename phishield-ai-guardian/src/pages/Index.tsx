import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScamAnalyzer from "@/components/ScamAnalyzer";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDemo(true);
    setTimeout(() => {
      demoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection onTryDemo={handleTryDemo} />
      
      {/* Demo Scanner Preview Section */}
      <AnimatePresence>
        {showDemo && (
          <motion.section 
            ref={demoRef} 
            id="scanner" 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="py-12 relative z-20 -mt-10 mb-10 overflow-hidden"
          >
            <div className="container mx-auto px-4">
              <ScamAnalyzer />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

