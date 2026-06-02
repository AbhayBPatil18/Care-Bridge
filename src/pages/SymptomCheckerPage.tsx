import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Severity } from "../types";

const symptomsByPart: Record<string, string[]> = {
  Head: ["Headache", "Dizziness", "Blurred vision", "Fever"],
  Chest: ["Chest pain", "Shortness of breath", "Cough", "Palpitations"],
  Abdomen: ["Nausea", "Cramping", "Bloating", "Vomiting"],
  Limbs: ["Joint pain", "Numbness", "Swelling", "Weakness"]
};

export function SymptomCheckerPage() {
  const [step, setStep] = useState(1);
  const [part, setPart] = useState("Head");
  const [selected, setSelected] = useState<string[]>([]);
  const severity: Severity = useMemo(() => selected.some((s) => /chest|breath|weakness/i.test(s)) ? "Emergency" : selected.length > 2 ? "High" : selected.length > 1 ? "Medium" : "Low", [selected]);
  const colors = { Low: "text-care-success bg-emerald-50", Medium: "text-care-warning bg-amber-50", High: "text-orange-600 bg-orange-50", Emergency: "text-care-danger bg-red-50" };
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-extrabold">Symptom Checker</h1>
      <div className="card">
        {step === 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h2 className="text-xl font-bold">Select body area</h2><div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr]"><svg viewBox="0 0 180 260" className="mx-auto h-80"><circle onClick={() => setPart("Head")} cx="90" cy="36" r="27" className="cursor-pointer fill-blue-200 hover:fill-blue-400" /><rect onClick={() => setPart("Chest")} x="55" y="70" width="70" height="62" rx="22" className="cursor-pointer fill-teal-200 hover:fill-teal-400" /><rect onClick={() => setPart("Abdomen")} x="58" y="135" width="64" height="55" rx="18" className="cursor-pointer fill-amber-200 hover:fill-amber-400" /><path onClick={() => setPart("Limbs")} d="M45 80 L20 165 M135 80 L160 165 M70 190 L58 250 M110 190 L122 250" stroke="#93C5FD" strokeWidth="20" strokeLinecap="round" className="cursor-pointer hover:stroke-blue-500" /></svg><div className="grid content-center gap-3">{Object.keys(symptomsByPart).map((item) => <button key={item} className={`rounded-2xl border p-4 text-left font-bold ${part === item ? "border-care-primary bg-blue-50 text-care-primary dark:bg-blue-950" : "border-slate-200 dark:border-slate-700"}`} onClick={() => setPart(item)}>{item}</button>)}</div></div><button className="btn-primary mt-5" onClick={() => setStep(2)}>Continue</button></motion.div>}
        {step === 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h2 className="text-xl font-bold">{part} symptoms</h2><div className="mt-5 grid gap-3 md:grid-cols-2">{symptomsByPart[part].map((symptom) => <label key={symptom} className="rounded-2xl border border-slate-200 p-4 font-semibold dark:border-slate-700"><input className="mr-3" type="checkbox" checked={selected.includes(symptom)} onChange={() => setSelected((items) => items.includes(symptom) ? items.filter((item) => item !== symptom) : [...items, symptom])} />{symptom}</label>)}</div><button className="btn-primary mt-5" onClick={() => setStep(3)}>Generate assessment</button></motion.div>}
        {step === 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className={`rounded-full px-4 py-2 text-sm font-extrabold ${colors[severity]}`}>{severity} severity</span><h2 className="mt-5 text-2xl font-extrabold">AI assessment</h2><p className="mt-3 text-slate-600 dark:text-slate-300">Possible causes include dehydration, stress response, viral illness, medication side effects, or a condition requiring clinical review. This is not a diagnosis.</p><div className="mt-5 grid gap-3 md:grid-cols-3">{["Monitor symptoms", "Hydrate and rest", severity === "Emergency" ? "Call emergency services" : "Book clinician visit"].map((item) => <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold dark:bg-slate-800" key={item}>{item}</div>)}</div><Link to="/appointments" className="btn-primary mt-6"><CalendarPlus size={18} />Book Appointment</Link></motion.div>}
      </div>
    </div>
  );
}
