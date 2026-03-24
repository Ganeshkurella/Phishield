import { Shield, Zap, ArrowRight, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onTryDemo?: (e: React.MouseEvent) => void;
}

const HeroSection = ({ onTryDemo }: HeroSectionProps) => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(187 80% 48%) 1px, transparent 1px), linear-gradient(90deg, hsl(187 80% 48%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-primary/20 mb-8"
          >
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-gradient">AI-Powered Cybersecurity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-gradient">PHISHIELD</span>
            <br />
            <span className="text-foreground">Stop Scams Before</span>
            <br />
            <span className="text-foreground">They Strike</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 font-light"
          >
            Detect Phishing, Job Scams & Investment Fraud
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg"
          >
            Your ultimate AI-powered shield. We analyze links, emails, and screenshots in milliseconds to protect you from cyber threats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {user ? (
              <a
                href="#scanner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-cyber-solid text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-cyan"
              >
                <Shield className="w-5 h-5" />
                Get Started
              </a>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-cyber-solid text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-cyan"
              >
                <LogIn className="w-5 h-5" />
                Get Started
              </Link>
            )}
            
            <a
              href="#scanner"
              onClick={onTryDemo}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass-panel border border-white/10 text-foreground font-semibold text-lg hover:bg-white/5 hover:border-primary/50 transition-all"
            >
              Try Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Animated shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="w-32 h-32 mx-auto relative animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-cyber-solid opacity-20 blur-3xl" />
              <Shield className="w-full h-full text-primary drop-shadow-[0_0_30px_hsl(187_80%_48%/0.6)]" strokeWidth={1} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
