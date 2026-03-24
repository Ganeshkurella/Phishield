import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const areaData = [
  { day: "Mon", threats: 12, safe: 145 },
  { day: "Tue", threats: 8, safe: 132 },
  { day: "Wed", threats: 23, safe: 167 },
  { day: "Thu", threats: 5, safe: 120 },
  { day: "Fri", threats: 18, safe: 189 },
  { day: "Sat", threats: 3, safe: 95 },
  { day: "Sun", threats: 7, safe: 78 },
];

const barData = [
  { name: "Fake Login", count: 42 },
  { name: "URL Spoof", count: 35 },
  { name: "SSL Fraud", count: 28 },
  { name: "Typosquat", count: 22 },
  { name: "Redirect", count: 15 },
];

const pieData = [
  { name: "Safe", value: 78 },
  { name: "Suspicious", value: 15 },
  { name: "Phishing", value: 7 },
];
const PIE_COLORS = ["hsl(142, 76%, 46%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Dashboard Preview</span>
          </h2>
          <p className="text-muted-foreground">Real-time analytics and threat monitoring at a glance</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "URLs Scanned", value: "12,847", change: "+12%" },
            { label: "Threats Blocked", value: "234", change: "+3%" },
            { label: "Risk Score", value: "12%", change: "-5%" },
            { label: "Uptime", value: "99.9%", change: "Stable" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-primary">{s.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-5 lg:col-span-2"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Threat Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 92%)" }} />
                <Area type="monotone" dataKey="safe" stroke="hsl(187, 80%, 48%)" fill="url(#cyanGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="threats" stroke="hsl(0, 84%, 60%)" fill="url(#redGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">URL Classification</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 92%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-5 lg:col-span-3"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Most Common Phishing Indicators</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 92%)" }} />
                <Bar dataKey="count" fill="hsl(263, 70%, 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
