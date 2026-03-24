import { User, Globe, Cpu, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: User, label: "User Browses", desc: "You visit a website normally" },
  { icon: Globe, label: "Extension Intercepts", desc: "Browser extension captures URL" },
  { icon: Cpu, label: "Feature Extraction", desc: "30+ features extracted from URL" },
  { icon: BarChart3, label: "AI Models Analyze", desc: "XGBoost + CNN score the threat" },
  { icon: ShieldCheck, label: "Block & Warn", desc: "Instant protection if threat found" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-cyber">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-muted-foreground">From click to protection in under 200ms</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-xl p-6 text-center w-48 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(187_100%_45%/0.15)] transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-cyber-solid mx-auto mb-4 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)] group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">{step.label}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-primary mx-2 hidden md:block shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
