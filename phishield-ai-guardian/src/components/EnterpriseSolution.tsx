import { Building2, GraduationCap, Landmark, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  { icon: Building2, title: "Banking & Finance", desc: "Protect customers from credential harvesting and fake banking portals" },
  { icon: GraduationCap, title: "Education", desc: "Safeguard students and staff from phishing targeting university portals" },
  { icon: Landmark, title: "Government", desc: "Secure government communications and citizen-facing services" },
  { icon: Code2, title: "API Access", desc: "Integrate PHISHIELD into your security stack with our REST API" },
];

const EnterpriseSolution = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Enterprise Solutions</span>
          </h2>
          <p className="text-muted-foreground">Tailored phishing protection for every industry</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-cyber-solid mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSolution;
