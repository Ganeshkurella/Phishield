import { AlertOctagon, ShieldAlert, FileWarning, ShieldCheck } from "lucide-react";
import { useHistory } from "../lib/history";
import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

const DashboardStats = () => {
  const { user } = useAuth();
  const history = useHistory(user?.id);

  const stats = useMemo(() => {
    const safeScans = history.filter(h => h.result === "Safe").length;
    const threatsDetected = history.filter(h => h.result === "Scam" || h.result === "Suspicious").length;
    const highRiskAlerts = history.filter(h => h.result === "Scam").length;
    
    // Calculate average risk score
    const avgRisk = history.length > 0
      ? history.reduce((acc, h) => acc + h.riskScore, 0) / history.length
      : 0;
    
    const userRiskLevel = avgRisk > 50 ? "High" : avgRisk > 20 ? "Medium" : "Low";
    const userRiskDetails = avgRisk > 50 ? "needs attention" : avgRisk > 20 ? "monitor activity" : "excellent standing";
    const userRiskColor = avgRisk > 50 ? "text-danger" : avgRisk > 20 ? "text-warning" : "text-primary";
    const userRiskBg = avgRisk > 50 ? "bg-danger/10" : avgRisk > 20 ? "bg-warning/10" : "bg-primary/10";

    return [
      {
        title: "Threats Detected",
        value: threatsDetected.toString(),
        subtitle: "all time",
        icon: AlertOctagon,
        color: "text-danger",
        bg: "bg-danger/10",
      },
      {
        title: "Safe Scans",
        value: safeScans.toString(),
        subtitle: "verified links",
        icon: ShieldCheck,
        color: "text-success",
        bg: "bg-success/10",
      },
      {
        title: "High-Risk Alerts",
        value: highRiskAlerts.toString(),
        subtitle: "requires attention",
        icon: ShieldAlert,
        color: "text-warning",
        bg: "bg-warning/10",
      },
      {
        title: "User Risk Level",
        value: userRiskLevel,
        subtitle: userRiskDetails,
        icon: FileWarning,
        color: userRiskColor,
        bg: userRiskBg,
      },
    ];
  }, [history]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-xs text-muted-foreground/70">{stat.subtitle}</p>
          </div>
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
