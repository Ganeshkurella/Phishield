import { Zap, Brain, ShieldCheck, Eye } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    icon: Brain,
    title: "AI-Based Detection",
    desc: "Our machine learning models are trained on millions of data points to recognize the subtle patterns of scams that humans often miss.",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    desc: "We analyze URLs, emails, and screenshots in milliseconds, stopping threats instantly before they can compromise your data.",
  },
  {
    icon: Eye,
    title: "Explainable Results",
    desc: "No black boxes. Our Transparent AI (SHAP) explains exactly why something was flagged, helping you learn and spot future scams.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Scam Protection",
    desc: "Whether it's a fake job offer, a phishing link, or an investment scheme, our multi-layered defense shields you across the board.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">The PHISHIELD Solution</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
             <span className="text-foreground">Smarter Defense for a </span>
             <br/>
             <span className="text-gradient">Safer Digital Life.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don't just block known malicious links. We use advanced artificial intelligence to proactively detect and neutralize new threats as they emerge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start group hover:border-primary/30 transition-all hover:glow-cyan"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-cyber flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
