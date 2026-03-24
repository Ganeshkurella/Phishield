import { Smartphone, Mail, Network, Bot } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Smartphone, title: "Mobile Browser Support", desc: "Extend protection to mobile browsers on iOS and Android", quarter: "Q3 2025" },
  { icon: Mail, title: "Email & SMS Detection", desc: "Scan email links and SMS messages for phishing attempts", quarter: "Q4 2025" },
  { icon: Network, title: "Federated Learning", desc: "Privacy-preserving model training across organizations", quarter: "Q1 2026" },
  { icon: Bot, title: "AI Scam Detection", desc: "Detect social engineering and AI-generated scam content", quarter: "Q2 2026" },
];

const Roadmap = () => {
  return (
    <section className="py-24 bg-gradient-cyber">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Future Roadmap</span>
          </h2>
          <p className="text-muted-foreground">What's coming next for PHISHIELD</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-cyber-solid flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="glass rounded-xl p-5 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{item.quarter}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
