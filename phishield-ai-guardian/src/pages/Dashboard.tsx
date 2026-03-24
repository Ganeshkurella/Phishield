import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { ShieldAlert, ShieldCheck, Activity, Flag } from "lucide-react";
import DashboardStats from "../components/DashboardStats";
import ScamAnalyzer from "../components/ScamAnalyzer";
import SecurityHistory from "../components/SecurityHistory";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome to <span className="text-gradient">PHISHIELD</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Hi {user?.displayName || "User"}! Your AI assistant for detecting online scams.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Main Analyzer */}
        <div className="mt-12">
          <ScamAnalyzer />
        </div>

        {/* Security History */}
        <div className="mt-16">
          <SecurityHistory />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
