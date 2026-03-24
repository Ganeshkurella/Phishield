import { ShieldAlert, Briefcase, TrendingDown, MessageSquareWarning } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: ShieldAlert,
    title: "Phishing Attacks",
    desc: "Deceptive emails and websites designed to steal your passwords, credit card numbers, and personal info.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Briefcase,
    title: "Fake Job Offers",
    desc: "Scammers posing as recruiters to collect your sensitive data or demand upfront payment for 'equipment'.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: TrendingDown,
    title: "Investment Fraud",
    desc: "Get-rich-quick crypto schemes and fake trading platforms that disappear with your hard-earned money.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: MessageSquareWarning,
    title: "Scam Messages",
    desc: "Urgent SMS or social media texts containing malicious links under the guise of package deliveries or bank alerts.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-background/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-medium">The Threat Landscape</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
             <span className="text-foreground">Scams are Getting</span>
             <br/>
             <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">Smart.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cybercriminals are using advanced tactics to bypass traditional security. 
            Falling victim can cost you your identity, your savings, and your peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:border-red-500/30 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${p.bg} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />
              
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-6 relative z-10 border border-white/5`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
