import { AlertOctagon, ShieldAlert, FileWarning, ShieldCheck } from "lucide-react";

const stats = [
  {
    title: "Threats Detected",
    value: "14",
    subtitle: "this week",
    icon: AlertOctagon,
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    title: "Safe Scans",
    value: "128",
    subtitle: "verified links",
    icon: ShieldCheck,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "High-Risk Alerts",
    value: "3",
    subtitle: "requires attention",
    icon: ShieldAlert,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    title: "User Risk Level",
    value: "Low",
    subtitle: "excellent standing",
    icon: FileWarning,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const DashboardStats = () => {
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
