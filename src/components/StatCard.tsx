import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export function StatCard({ title, value, unit, color, icon: Icon, data }: { title: string; value: string; unit: string; color: string; icon: LucideIcon; data: number[] }) {
  const chartData = data.map((value, index) => ({ index, value }));
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <div className="mt-2 flex items-end gap-1">
            <span className="text-3xl font-bold">{value}</span>
            <span className="pb-1 text-sm text-slate-500">{unit}</span>
          </div>
        </div>
        <div className="rounded-2xl p-3 text-white" style={{ backgroundColor: color }}><Icon size={22} /></div>
      </div>
      <div className="mt-4 h-14">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line dataKey="value" type="monotone" stroke={color} strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs font-semibold" style={{ color }}>Stable range</p>
    </motion.div>
  );
}
