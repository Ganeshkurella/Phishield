import { ShieldAlert, Briefcase, GraduationCap, TrendingDown, MessageSquareWarning, Gift, CreditCard, UserX } from "lucide-react";
import { motion } from "framer-motion";

const detectionTypes = [
  { icon: ShieldAlert, title: "Phishing Websites", desc: "Fake login pages and credential stealers" },
  { icon: Briefcase, title: "Job Scams", desc: "Fraudulent recruitment and work-from-home offers" },
  { icon: GraduationCap, title: "Scholarship Scams", desc: "Fake grants and education fee traps" },
  { icon: TrendingDown, title: "Investment Scams", desc: "Crypto fraud and get-rich-quick schemes" },
  { icon: MessageSquareWarning, title: "Fake Messages", desc: "Malicious SMS and social media links" },
  { icon: Gift, title: "Prize Scams", desc: "Fake giveaways and lottery notifications" },
  { icon: CreditCard, title: "Payment Scams", desc: "Fraudulent invoices and checkout pages" },
  { icon: UserX, title: "Identity Theft", desc: "Pages designed to steal PII and secure data" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Comprehensive Protection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
             <span className="text-foreground">What PHISHIELD </span>
             <span className="text-gradient">Detects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our AI models are trained to identify out a wide variety of cyber threats, keeping you safe across all your digital interactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {detectionTypes.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel rounded-xl p-6 group hover:border-primary/40 hover:-translate-y-1 transition-all hover:shadow-[0_0_30px_hsl(187_100%_45%/0.15)] cursor-default flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-cyber flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(45,212,191,0.1)] group-hover:shadow-[0_0_25px_rgba(45,212,191,0.3)]">
                <d.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
