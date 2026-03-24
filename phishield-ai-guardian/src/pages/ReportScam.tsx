import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert, Send, FileWarning, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const ReportScamPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scamType, setScamType] = useState("phishing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-danger/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-20 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger shadow-lg">
                <ShieldAlert className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Report a <span className="text-danger">Scam</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Help us protect the community by reporting suspicious links, messages, or offers.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 md:p-12 rounded-3xl border border-success/30 text-center shadow-2xl bg-success/5"
              >
                <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-3 text-foreground">Report Submitted</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for keeping the community safe! Our AI models are analyzing your submission to prevent future attacks.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-foreground"
                >
                  Report Another Scam
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 rounded-3xl border border-white/10 shadow-2xl glow-cyan-sm"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20 text-warning mb-8 text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    <strong>Note:</strong> Never submit sensitive personal information (like your real passwords or SSN) in this form. 
                    Only submit the suspicious links or messages the scammer sent you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">
                      Suspicious URL or Message Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      required
                      placeholder="Paste the phishing link, fake job offer, or scam message here..."
                      className="w-full min-h-[120px] p-4 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">
                      Scam Type (Optional)
                    </label>
                    <div className="relative">
                      <select 
                        value={scamType}
                        onChange={(e) => setScamType(e.target.value)}
                        className="w-full p-4 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none text-sm"
                      >
                        <option value="phishing">Phishing Link / Clone Website</option>
                        <option value="job">Fake Job Offer / Task Scam</option>
                        <option value="investment">Crypto / Investment Fraud</option>
                        <option value="message">Suspicious Text / WhatsApp Message</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      placeholder="How did you encounter this? Any specific context?"
                      className="w-full min-h-[80px] p-4 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none text-sm"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-danger hover:bg-danger/90 text-white font-bold text-lg h-14 rounded-xl mt-4 relative overflow-hidden group shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none"></div>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                         Submitting Report...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FileWarning className="w-5 h-5" />
                        Submit Scam Report
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportScamPage;
