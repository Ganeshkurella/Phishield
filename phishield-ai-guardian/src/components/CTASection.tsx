import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-10 md:p-16 border border-primary/30 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          {/* Decorative mesh */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:opacity-20 transition-opacity" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-cyber flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(45,212,191,0.3)]">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Secure Your Digital Life?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust PHISHIELD to protect them from phishing, fake jobs, and advanced online scams.
            </p>
            
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-cyber-solid text-primary-foreground font-bold text-lg hover:opacity-90 transition-all glow-cyan hover:scale-105"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-cyber-solid text-primary-foreground font-bold text-lg hover:opacity-90 transition-all glow-cyan hover:scale-105 w-full sm:w-auto"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
            
            <p className="mt-6 text-sm text-muted-foreground">
              Free to use • No credit card required • Instant protection
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
