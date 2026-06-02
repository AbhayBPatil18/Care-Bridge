import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import type { ReactElement } from "react";
import { metrics } from "../data/demoData";

export function AnalyticsPage() {
  const [range, setRange] = useState("7 days");
  const pie = [{ name: "Fitness", value: 32 }, { name: "Nutrition", value: 24 }, { name: "Sleep", value: 26 }, { name: "Mental", value: 18 }];
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><h1 className="text-3xl font-extrabold">Live Analytics</h1><div className="flex gap-2">{["7 days", "30 days", "90 days"].map((item) => <button className={`rounded-2xl px-4 py-2 text-sm font-bold ${range === item ? "bg-care-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`} onClick={() => setRange(item)}>{item}</button>)}</div></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Chart title="Heart rate trend"><LineChart data={metrics}><XAxis dataKey="day" /><YAxis /><Tooltip /><Line dataKey="heartRate" stroke="#EF4444" strokeWidth={3} /></LineChart></Chart>
        <Chart title="Weekly step count"><BarChart data={metrics}><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="steps" fill="#10B981" radius={[8, 8, 0, 0]} /></BarChart></Chart>
        <Chart title="Sleep quality"><AreaChart data={metrics}><XAxis dataKey="day" /><YAxis /><Tooltip /><Area dataKey="sleep" stroke="#2563EB" fill="#DBEAFE" /></AreaChart></Chart>
        <Chart title="Health score breakdown"><PieChart><Pie data={pie} dataKey="value" nameKey="name" innerRadius={62} outerRadius={95}>{pie.map((_, index) => <Cell key={index} fill={["#2563EB", "#0D9488", "#F59E0B", "#10B981"][index]} />)}</Pie><Tooltip /></PieChart></Chart>
      </div>
      <section className="card"><h2 className="text-xl font-bold">Overall health score</h2><div className="h-64"><ResponsiveContainer><RadialBarChart innerRadius="55%" outerRadius="90%" data={[{ name: "Score", value: 86, fill: "#0D9488" }]} startAngle={180} endAngle={0}><RadialBar dataKey="value" cornerRadius={12} /><text x="50%" y="55%" textAnchor="middle" className="fill-slate-900 text-4xl font-extrabold dark:fill-white">86</text></RadialBarChart></ResponsiveContainer></div></section>
    </div>
  );
}

function Chart({ title, children }: { title: string; children: ReactElement }) {
  return <section className="card"><h2 className="text-xl font-bold">{title}</h2><div className="mt-4 h-72"><ResponsiveContainer>{children}</ResponsiveContainer></div></section>;
}
