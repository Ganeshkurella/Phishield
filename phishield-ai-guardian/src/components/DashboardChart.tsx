import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useHistory } from '../lib/history';
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardChart = () => {
  const { user } = useAuth();
  const history = useHistory(user?.id);

  const data = useMemo(() => {
    const safeScans = history.filter(h => h.result === "Safe").length;
    const threatsDetected = history.filter(h => h.result === "Scam" || h.result === "Suspicious").length;
    const highRiskAlerts = history.filter(h => h.result === "Scam").length;

    return [
      { name: 'Safe Scans', value: safeScans, color: '#10b981' },
      { name: 'Threats Detected', value: threatsDetected, color: '#ef4444' },
      { name: 'High-Risk Alerts', value: highRiskAlerts, color: '#f59e0b' },
    ];
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass p-6 rounded-2xl border border-white/5 w-full mt-6"
    >
      <h3 className="text-xl font-semibold mb-6">Scan Summary Overview</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#a1a1aa" 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#a1a1aa" 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DashboardChart;
