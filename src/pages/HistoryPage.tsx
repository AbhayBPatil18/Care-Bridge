import { FileUp, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { history } from "../data/demoData";

export function HistoryPage() {
  const [condition, setCondition] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("h1");
  const items = useMemo(() => condition === "All" ? history : history.filter((item) => item.condition === condition), [condition]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-extrabold">Medical History</h1>
        <label className="btn-primary cursor-pointer"><FileUp size={18} />Upload lab report<input hidden type="file" onChange={() => alert("Document upload simulated")} /></label>
      </div>
      <section className="card flex flex-wrap items-center gap-3"><Filter size={18} /><select className="input max-w-xs" value={condition} onChange={(event) => setCondition(event.target.value)}>{["All", "Cardiac", "Respiratory", "Dermatology", "General"].map((item) => <option key={item}>{item}</option>)}</select><input className="input max-w-xs" type="date" /></section>
      <section className="relative space-y-4 before:absolute before:left-4 before:top-0 before:h-full before:w-1 before:bg-blue-100 dark:before:bg-blue-950">
        {items.map((item) => (
          <button key={item.id} className="card relative ml-10 w-[calc(100%-2.5rem)] text-left" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
            <span className="absolute -left-14 top-6 h-5 w-5 rounded-full bg-care-primary ring-4 ring-blue-100" />
            <div className="flex flex-col justify-between gap-2 md:flex-row"><div><b>{item.diagnosis}</b><p className="text-sm text-slate-500">{item.date} · {item.doctor} · {item.condition}</p></div><span className="text-sm font-bold text-care-teal">{item.prescription}</span></div>
            {expanded === item.id && <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item.notes}</p>}
          </button>
        ))}
      </section>
    </div>
  );
}
