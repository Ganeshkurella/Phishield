import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Request a Demo</span>
          </h2>
          <p className="text-muted-foreground">Get in touch to see PHISHIELD in action</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Organization"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <textarea
                required
                rows={4}
                placeholder="Tell us about your security needs..."
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-cyber-solid text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Request Demo
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
