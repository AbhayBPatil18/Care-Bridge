import { CalendarPlus, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppData } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { doctors } from "../data/demoData";
import { Appointment } from "../types";

const specialties = ["Cardiology", "Neurology", "Orthopedics", "Dermatology", "Pediatrics", "Mental Health"];
const times = ["09:00", "09:30", "10:30", "11:00", "14:00", "15:30", "17:00", "18:30"];

export function AppointmentPage() {
  const [specialty, setSpecialty] = useState("Cardiology");
  const [doctorId, setDoctorId] = useState("doctor-1");
  const [date, setDate] = useState("2026-06-05");
  const [time, setTime] = useState("09:30");
  const { addAppointment } = useAppData();
  const { user } = useAuth();
  const doctor = doctors.find((item) => item.id === doctorId) ?? doctors[0];
  function confirm() {
    const appointment: Appointment = { id: crypto.randomUUID(), patientId: user!.id, patientName: user!.name, doctorId, doctorName: doctor.name, specialty, date, time, status: "confirmed", type: "Consultation" };
    addAppointment(appointment);
    toast.success("Appointment saved");
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Book Appointment</h1>
      <section className="card"><h2 className="text-xl font-bold">1. Select specialty</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{specialties.map((item) => <button key={item} className={`rounded-2xl border p-4 text-left font-bold ${specialty === item ? "border-care-primary bg-blue-50 text-care-primary dark:bg-blue-950" : "border-slate-200 dark:border-slate-700"}`} onClick={() => setSpecialty(item)}>{item}</button>)}</div></section>
      <section className="card"><h2 className="text-xl font-bold">2. Select doctor</h2><div className="mt-4 grid gap-4 md:grid-cols-4">{doctors.map((item) => <button key={item.id} className={`overflow-hidden rounded-2xl border text-left ${doctorId === item.id ? "border-care-primary" : "border-slate-200 dark:border-slate-700"}`} onClick={() => setDoctorId(item.id)}><img src={item.photo} alt="" className="h-32 w-full object-cover" /><div className="p-3"><b>{item.name}</b><p className="text-sm text-slate-500">{item.specialty}</p><p className="mt-1 flex items-center gap-1 text-sm text-care-warning"><Star size={14} fill="currentColor" />{item.rating}</p><span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-bold ${item.available ? "bg-emerald-50 text-care-success" : "bg-slate-100 text-slate-500"}`}>{item.available ? "Available" : "Limited"}</span></div></button>)}</div></section>
      <section className="grid gap-5 lg:grid-cols-2"><div className="card"><h2 className="text-xl font-bold">3. Select date</h2><input className="input mt-4" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div><div className="card"><h2 className="text-xl font-bold">4. Select time</h2><div className="mt-4 grid grid-cols-4 gap-2">{times.map((item) => <button key={item} className={`rounded-2xl p-3 text-sm font-bold ${time === item ? "bg-care-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`} onClick={() => setTime(item)}>{item}</button>)}</div></div></section>
      <section className="card flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-xl font-bold">5. Confirmation</h2><p className="mt-2 text-slate-500">{doctor.name}, {specialty}, {date} at {time}</p></div><button className="btn-primary" onClick={confirm}><CalendarPlus size={18} />Confirm and Add to Calendar</button></section>
    </div>
  );
}
