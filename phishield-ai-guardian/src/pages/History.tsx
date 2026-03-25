import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, ShieldAlert, AlertTriangle, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getHistory, HistoryItem } from "../lib/history";
import { useAuth } from "../contexts/AuthContext";

const historyData: HistoryItem[] = [
  { id: 1, date: "Mar 17, 2026", type: "URL", input: "paypal-login-security-update.com", result: "Scam", riskScore: 98 },
  { id: 2, date: "Mar 16, 2026", type: "Job Offer", input: "Google Internship Offer Letter.pdf", result: "Suspicious", riskScore: 65 },
  { id: 3, date: "Mar 15, 2026", type: "Message", input: "URGENT: Your package delivery failed...", result: "Scam", riskScore: 89 },
  { id: 4, date: "Mar 14, 2026", type: "URL", input: "github.com/phishield", result: "Safe", riskScore: 5 },
  { id: 5, date: "Mar 12, 2026", type: "Investment", input: "Guaranteed 200% Crypto Returns daily", result: "Scam", riskScore: 95 },
  { id: 6, date: "Mar 10, 2026", type: "URL", input: "netflix.com/browse", result: "Safe", riskScore: 2 },
  { id: 7, date: "Mar 08, 2026", type: "Scholarship", input: "National Merit $10,000 Grant Winner", result: "Suspicious", riskScore: 72 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Safe":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30">
          <ShieldCheck className="w-3.5 h-3.5" /> Safe
        </span>
      );
    case "Suspicious":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-warning/20 text-warning border border-warning/30">
          <AlertTriangle className="w-3.5 h-3.5" /> Suspicious
        </span>
      );
    case "Scam":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-danger/20 text-danger border border-danger/30">
          <ShieldAlert className="w-3.5 h-3.5" /> Scam
        </span>
      );
  }
};

const getRiskColor = (score: number) => {
  if (score < 30) return "text-success";
  if (score < 75) return "text-warning";
  return "text-danger";
};

const HistoryPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicHistory, setDynamicHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setDynamicHistory(getHistory(user?.id));
  }, [user?.id]);

  const allHistory = [...dynamicHistory, ...historyData];

  const filteredData = allHistory.filter(item => 
    item.input.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Scan <span className="text-gradient">History</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Review your past security analyses and previously detected threats.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl glow-cyan-sm"
        >
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search history by input or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background/50 border border-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold w-full md:w-auto overflow-hidden">
              <Filter className="w-4 h-4" /> Filter Results
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-background/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4">Date</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 hidden sm:table-cell">Input Preview</th>
                  <th className="p-4">Result</th>
                  <th className="p-4 text-right">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{item.date}</td>
                    <td className="p-4 text-sm font-medium">{item.type}</td>
                    <td className="p-4 text-sm text-muted-foreground truncate max-w-[200px] md:max-w-[300px] hidden sm:table-cell">
                      {item.input}
                    </td>
                    <td className="p-4 whitespace-nowrap">{getStatusBadge(item.result)}</td>
                    <td className="p-4 text-sm font-bold text-right">
                      <span className={getRiskColor(item.riskScore)}>{item.riskScore}/100</span>
                    </td>
                  </tr>
                ))}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No scans found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
