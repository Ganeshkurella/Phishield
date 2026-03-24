import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

const historyMock = [
  { id: 1, date: "Mar 10", type: "Job Offer", result: "Scam", details: "Upfront payment requested" },
  { id: 2, date: "Mar 9", type: "URL", result: "Safe", details: "Clean domain reputation" },
  { id: 3, date: "Mar 7", type: "Investment", result: "Suspicious", details: "Unrealistic returns promised" },
  { id: 4, date: "Mar 5", type: "Text Message", result: "Scam", details: "Urgency tactic with fake link" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Safe":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30">
          <ShieldCheck className="w-3 h-3" /> Safe
        </span>
      );
    case "Suspicious":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning/20 text-warning border border-warning/30">
          <AlertTriangle className="w-3 h-3" /> Suspicious
        </span>
      );
    case "Scam":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger/20 text-danger border border-danger/30">
          <ShieldAlert className="w-3 h-3" /> Scam
        </span>
      );
  }
};

const SecurityHistory = () => {
  return (
    <div className="glass p-6 md:p-8 rounded-2xl border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Personal Security History
        </h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground text-sm">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Result</th>
              <th className="pb-3 font-medium">Primary Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {historyMock.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-4 text-sm whitespace-nowrap text-muted-foreground">{item.date}</td>
                <td className="py-4 text-sm font-medium">{item.type}</td>
                <td className="py-4">{getStatusBadge(item.result)}</td>
                <td className="py-4 text-sm text-muted-foreground truncate max-w-[200px] md:max-w-[400px]">
                  {item.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityHistory;
