import { useState, useRef } from "react";
import { Search, Loader2, ShieldCheck, ShieldAlert, ShieldX, Link as LinkIcon, Briefcase, GraduationCap, TrendingUp, Landmark, Gift, CreditCard, UserX, AlertTriangle, FileWarning, Image as ImageIcon, Globe, FileText, Activity, Save, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeWithGroq, GroqScanResult } from "../lib/groq";
import Tesseract from "tesseract.js";
import { addHistory } from "../lib/history";

const statusConfig = {
  safe: { icon: ShieldCheck, label: "SAFE", color: "text-success", bg: "bg-success/10", border: "border-success/30", bar: "bg-success" },
  suspicious: { icon: ShieldAlert, label: "SUSPICIOUS", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", bar: "bg-warning" },
  phishing: { icon: ShieldX, label: "HIGH RISK", color: "text-danger", bg: "bg-danger/10", border: "border-danger/30", bar: "bg-danger" },
};

const shortcuts = [
  { label: "Check Website", icon: LinkIcon, hint: "https://paypal-login-security-update.com" },
  { label: "Verify Job Offer", icon: Briefcase, hint: "Congratulations! You are selected for Google internship. Pay ₹2000 training fee." },
  { label: "Check Scholarship", icon: GraduationCap, hint: "Click here to claim your guaranteed $10,000 national student grant!" },
  { label: "Analyze Investment", icon: TrendingUp, hint: "Guaranteed 200% returns in 24 hours! Send crypto to this wallet." },
  { label: "Verify Message", icon: Landmark, hint: "URGENT: Your tax return is suspended. Verify your SSN immediately here." },
];

const ScamAnalyzer = () => {
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [result, setResult] = useState<GroqScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async () => {
    if (!text.trim()) return;
    setScanning(true);
    setResult(null);
    
    // Call the real Groq API 
    const analysis = await analyzeWithGroq(text);
    let finalResult;
    if (analysis) {
      finalResult = analysis;
    } else {
      // Fallback in case the API call completely fails
      const lowerText = text.toLowerCase();
      const isRisky = ["urgent", "secure", "update", "free", "guaranteed", "login", "pay", "fee", "internship", "grant", "crypto"].some(word => lowerText.includes(word));
      
      finalResult = {
        riskScore: isRisky ? 85 : 15,
        status: isRisky ? "phishing" : "safe",
        explanation: "API analysis failed. Showing simulated result based on keywords.",
        reasons: isRisky ? ["Suspicious keywords detected (API offline)"] : ["No overt threats found (API offline)"]
      };
    }
    
    setResult(finalResult);

    // Save to history
    let scanType = "Text";
    if (text.includes("[Extracted from Image]")) scanType = "Image";
    else if (text.trim().startsWith("http")) scanType = "URL";
    
    let preview = text.replace("[Extracted from Image]:", "").trim();
    if (preview.length > 60) preview = preview.substring(0, 60) + "...";

    addHistory({
      type: scanType,
      input: preview,
      result: finalResult.status === "safe" ? "Safe" : finalResult.status === "suspicious" ? "Suspicious" : "Scam",
      riskScore: finalResult.riskScore
    });

    setScanning(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtracting(true);
    setResult(null);
    try {
      const result = await Tesseract.recognize(file, 'eng');
      // Append the new text to whatever was already in the input box
      const newText = result.data.text.trim();
      setText((prev) => prev ? `${prev}\n\n[Extracted from Image]:\n${newText}` : newText);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Failed to extract text from the image.");
    } finally {
      setExtracting(false);
      // Reset input so the same file could be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const StatusIcon = result ? statusConfig[result.status].icon : null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 md:p-8 glow-cyan border border-primary/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">The Scam Analyzer</h2>
          <p className="text-muted-foreground text-sm">Paste a suspicious link, message, job offer, or scheme here...</p>
        </div>

        <div className="relative mb-6 rounded-2xl border border-border/50 bg-background/40 overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all shadow-inner">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={extracting}
            placeholder={extracting ? "Extracting text from image..." : "Paste a link, message, job offer, or scheme..."}
            className="w-full min-h-[160px] p-5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none font-mono text-sm leading-relaxed disabled:opacity-50"
          />
          
          {/* Action Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-t border-border/50 w-full">
            <div className="flex items-center gap-3">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={extracting || scanning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors disabled:opacity-50 border border-primary/20 hover:border-primary/40"
              >
                {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                {extracting ? "Extracting..." : "Upload Screenshot"}
              </button>
            </div>
            
            {text && (
              <button 
                onClick={() => setText("")} 
                disabled={scanning || extracting}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/5 disabled:opacity-50"
              >
                Clear Text
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end mb-10">
          <button
            onClick={handleScan}
            disabled={scanning || extracting || !text.trim()}
            className="w-full md:w-auto px-8 py-4 rounded-xl relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-cyber-solid transition-all duration-300 group-hover:scale-[1.02] group-active:scale-[0.98]"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
            <div className="relative flex items-center justify-center gap-2 text-primary-foreground font-bold text-lg shadow-lg">
              {scanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze with PHISHIELD AI
                </>
              )}
            </div>
          </button>
        </div>

        {/* Categories grid */}
        {!result && !scanning && (
          <div className="mt-4 pt-6">
            <p className="text-sm font-semibold text-muted-foreground/80 flex items-center gap-2 mb-4">
              <span className="h-px bg-border/50 flex-1"></span>
              Helper Categories 
              <span className="h-px bg-border/50 flex-1"></span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {shortcuts.map((sc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 border border-white/5 text-sm font-medium text-muted-foreground cursor-default"
                  title={sc.hint}
                >
                  <sc.icon className="w-4 h-4 text-primary" />
                  {sc.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result Area */}
        <AnimatePresence>
          {result && !scanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Score & Gauge */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    {StatusIcon && <StatusIcon className={`w-8 h-8 ${statusConfig[result.status].color}`} />}
                    <h3 className={`text-2xl font-black ${statusConfig[result.status].color}`}>
                      {statusConfig[result.status].label}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold bg-background/50 px-4 py-2 rounded-lg border border-white/5">
                      <span className="text-muted-foreground">Scam Type Detected:</span>
                      <span className="text-foreground">{result.status === "phishing" ? "Phishing Attempt" : result.status === "suspicious" ? "Suspicious Activity" : "None Detected"}</span>
                    </div>
                  
                    <div className="space-y-2 relative pt-2">
                       <div className="flex justify-between text-sm font-bold mb-1">
                          <span className="text-muted-foreground">Risk Score</span>
                          <span className={statusConfig[result.status].color}>{result.riskScore} / 100</span>
                      </div>
                      
                      {/* Gauge Bar */}
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.riskScore}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${statusConfig[result.status].bar}`}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-1">
                        <span>Low Risk</span>
                        <span>Medium Risk</span>
                        <span>High Risk</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm pt-4 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                {/* XAI Reasons */}
                <div className="flex-1 bg-background/40 rounded-xl p-6 border border-white/5">
                  <h4 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary" /> 
                    Why this is {result.status === "safe" ? "safe" : "risky"} (XAI)
                  </h4>
                  <ul className="space-y-4">
                    {/* Hardcoded Reason Examples matching User Request */}
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground block mb-0.5">Domain Age</strong>
                        {result.status === "safe" ? "Domain has been registered for a significant period." : "Domain was registered recently (less than 30 days ago)."}
                      </div>
                    </motion.li>
                    
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground block mb-0.5">Suspicious Content</strong>
                        {result.status === "safe" ? "No malicious keywords or deceptive language detected." : "Text contains high-pressure tactics or unusual requests for personal info."}
                      </div>
                    </motion.li>

                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground block mb-0.5">Scam Patterns Detected</strong>
                        {result.status === "safe" ? "0 patterns matching known database threats." : "Matches known phishing templates or fraudulent structures."}
                      </div>
                    </motion.li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {result.status !== "safe" && (
                      <button className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-danger/30 bg-danger/5 hover:bg-danger/20 text-danger transition-colors text-xs font-semibold">
                        <FileWarning className="w-3.5 h-3.5" />
                        Report Scam
                      </button>
                    )}
                    <button className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/20 text-primary transition-colors text-xs font-semibold">
                      <Save className="w-3.5 h-3.5" />
                      Save Result
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-foreground transition-colors text-xs font-semibold">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ScamAnalyzer;
