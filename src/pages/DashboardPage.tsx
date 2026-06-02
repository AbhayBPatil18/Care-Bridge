import { Activity, CalendarPlus, Droplets, Footprints, HeartPulse, MessageCircle, ShieldAlert, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { metrics } from "../data/demoData";
import { StatCard } from "../components/StatCard";

export function DashboardPage() {
  const { user } = useAuth();
  if (user?.role === "doctor") return <DoctorDashboard />;
  if (user?.role === "admin") return <AdminDashboard />;
  return <PatientDashboard />;
}

function PatientDashboard() {
  const { user } = useAuth();
  const { appointments, medications, toggleMedication } = useAppData();
  const latest = metrics[metrics.length - 1];
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-care-primary to-care-teal p-6 text-white shadow-soft md:flex-row md:items-center">
        <div><p className="text-blue-100">{new Date().toLocaleString()}</p><h1 className="mt-2 text-3xl font-extrabold">Good day, {user?.name}</h1><p className="mt-2 text-blue-50">Your recovery signals look steady. Two medication doses still need attention.</p></div>
        <img src={user?.avatar} alt="" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/30" />
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Heart Rate" value={String(latest.heartRate)} unit="bpm" color="#EF4444" icon={HeartPulse} data={metrics.map((m) => m.heartRate)} />
        <StatCard title="Blood Pressure" value={`${latest.systolic}/${latest.diastolic}`} unit="mmHg" color="#2563EB" icon={Activity} data={metrics.map((m) => m.systolic)} />
        <StatCard title="Blood Oxygen" value={String(latest.oxygen)} unit="%" color="#0D9488" icon={Droplets} data={metrics.map((m) => m.oxygen)} />
        <StatCard title="Steps Today" value={latest.steps.toLocaleString()} unit="steps" color="#10B981" icon={Footprints} data={metrics.map((m) => m.steps)} />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[["Book Appointment", "/appointments", CalendarPlus], ["AI Chatbot", "/chatbot", MessageCircle], ["Symptom Checker", "/symptoms", Stethoscope]].map(([label, href, Icon]) => <Link key={String(label)} to={String(href)} className="card text-center transition hover:-translate-y-1"><Icon className="mx-auto text-care-primary" /><p className="mt-3 font-bold">{String(label)}</p></Link>)}
        <button className="card text-center transition hover:-translate-y-1" onClick={() => window.dispatchEvent(new Event("carebridge:sos"))}><ShieldAlert className="mx-auto text-care-danger" /><p className="mt-3 font-bold">Emergency SOS</p></button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="card lg:col-span-2"><h2 className="text-xl font-bold">Upcoming Appointments</h2>{appointments.slice(0, 5).map((item) => <div key={item.id} className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div><b>{item.doctorName}</b><p className="text-sm text-slate-500">{item.specialty} · {item.date} at {item.time}</p></div><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-care-primary">{item.status}</span></div>)}</section>
        <section className="card"><h2 className="text-xl font-bold">Today&apos;s Medicines</h2>{medications.slice(0, 5).map((item) => <label key={item.id} className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-800"><span><b>{item.name}</b><p className="text-xs text-slate-500">{item.dosage} · {item.time}</p></span><input type="checkbox" checked={item.taken} onChange={() => toggleMedication(item.id)} /></label>)}</section>
      </div>
      <section className="card"><h2 className="text-xl font-bold">Recent Activity</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{["Sleep score improved", "Lab report uploaded", "Cardiology note added"].map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">{item}</div>)}</div></section>
    </div>
  );
}

function DoctorDashboard() {
  const { appointments } = useAppData();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Doctor Workspace</h1>
      <div className="grid gap-4 md:grid-cols-3">{["18 patients today", "6 pending reports", "12 new messages"].map((item) => <div key={item} className="card text-2xl font-extrabold">{item}</div>)}</div>
      <input className="input" placeholder="Search patient records" />
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card"><h2 className="text-xl font-bold">Today&apos;s Schedule</h2>{appointments.filter((a) => a.doctorId === "doctor-1").map((item) => <div className="mt-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800" key={item.id}><b>{item.time} · {item.patientName}</b><p className="text-sm text-slate-500">{item.type}</p></div>)}</section>
        <section className="card"><h2 className="text-xl font-bold">Patient Queue</h2>{appointments.slice(1, 5).map((item) => <div className="mt-3 flex justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800" key={item.id}><b>{item.patientName}</b><span className="text-sm font-bold text-care-teal">{item.status}</span></div>)}</section>
      </div>
      <section className="card"><h2 className="text-xl font-bold">Recent Patient Notes</h2>{["Adjusted hypertension plan", "Reviewed migraine diary", "Ordered lipid panel", "Cleared post-procedure follow-up", "Discussed sleep hygiene"].map((item) => <p className="mt-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800" key={item}>{item}</p>)}</section>
    </div>
  );
}

function AdminDashboard() {
  const { notifications } = useAppData();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Admin Control Panel</h1>
      <div className="grid gap-4 md:grid-cols-4">{["3,482 users", "918 active sessions", "74 appointments", "$42.8K revenue"].map((item) => <div className="card"><p className="text-2xl font-extrabold">{item}</p></div>)}</div>
      <section className="card overflow-auto"><h2 className="text-xl font-bold">User Management</h2><table className="mt-4 w-full text-left text-sm"><tbody>{["John Doe · Patient · Active", "Dr. Maya Smith · Doctor · Active", "Avery Admin · Admin · Active"].map((row) => <tr className="border-t border-slate-100 dark:border-slate-800" key={row}><td className="py-4 font-semibold">{row}</td><td><button className="btn-ghost border border-slate-200 !py-2 dark:border-slate-700">Deactivate</button></td></tr>)}</tbody></table></section>
      <div className="grid gap-4 md:grid-cols-3">{["API 142ms", "Uptime 99.98%", "Errors 0.04%"].map((item) => <div className="card text-center"><div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-8 border-care-teal text-xl font-extrabold">{item}</div></div>)}</div>
      <section className="card"><h2 className="text-xl font-bold">Audit Log</h2>{notifications.slice(0, 6).map((item) => <p className="mt-3 text-sm text-slate-500" key={item.id}>{item.timestamp} · {item.title}</p>)}</section>
    </div>
  );
}
