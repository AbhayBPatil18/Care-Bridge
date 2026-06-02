import { Bell, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppData } from "../context/AppContext";
import { Medication } from "../types";

export function MedicinePage() {
  const { medications, toggleMedication, addMedication } = useAppData();
  const [modal, setModal] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addMedication({ id: crypto.randomUUID(), name: String(form.get("name")), dosage: String(form.get("dosage")), frequency: String(form.get("frequency")), time: String(form.get("time")), slot: String(form.get("slot")) as Medication["slot"], taken: false });
    setModal(false);
    toast.success("Medication added");
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><h1 className="text-3xl font-extrabold">Medicine Reminder</h1><button className="btn-primary" onClick={() => setModal(true)}><Plus size={18} />Add Medication</button></div>
      <div className="grid gap-4 md:grid-cols-4">{["Morning", "Afternoon", "Evening", "Night"].map((slot) => <section className="card" key={slot}><h2 className="font-bold">{slot}</h2>{medications.filter((item) => item.slot === slot).map((item) => <label key={item.id} className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-800"><span><b className="text-sm">{item.name}</b><p className="text-xs text-slate-500">{item.time}</p></span><input type="checkbox" checked={item.taken} onChange={() => toggleMedication(item.id)} /></label>)}</section>)}</div>
      <section className="card"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Adherence streak</h2><p className="mt-1 text-sm text-slate-500">17 consecutive days</p></div><button className="btn-ghost border border-slate-200 dark:border-slate-700" onClick={() => toast.success("Browser notification simulation scheduled")}><Bell size={18} />Simulate reminder</button></div></section>
      <section className="card"><h2 className="text-xl font-bold">Current medications</h2>{medications.map((item) => <div key={item.id} className="mt-3 flex justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><span><b>{item.name}</b><p className="text-sm text-slate-500">{item.dosage} · {item.frequency} · {item.time}</p></span><span className={`font-bold ${item.taken ? "text-care-success" : "text-care-warning"}`}>{item.taken ? "Taken" : "Pending"}</span></div>)}</section>
      {modal && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"><h2 className="text-xl font-extrabold">Add Medication</h2><div className="mt-4 grid gap-3"><input className="input" name="name" placeholder="Name" required /><input className="input" name="dosage" placeholder="Dosage" required /><input className="input" name="frequency" placeholder="Frequency" required /><input className="input" name="time" type="time" required /><select className="input" name="slot">{["Morning", "Afternoon", "Evening", "Night"].map((slot) => <option key={slot}>{slot}</option>)}</select><div className="flex gap-2"><button className="btn-primary flex-1">Save</button><button type="button" className="btn-ghost flex-1 border border-slate-200" onClick={() => setModal(false)}>Cancel</button></div></div></form></div>}
    </div>
  );
}
