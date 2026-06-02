import { motion } from "framer-motion";
import { Ambulance, MapPin, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SosModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [eta, setEta] = useState(8);
  useEffect(() => {
    if (!open) return;
    setEta(8);
    const timer = window.setInterval(() => setEta((value) => Math.max(1, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-red-950/70 p-4">
      <motion.div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-950" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex animate-pulse rounded-full bg-red-100 p-4 text-care-danger"><Ambulance size={34} /></div>
            <h2 className="text-3xl font-extrabold text-care-danger">Emergency services notified</h2>
            <p className="mt-2 flex items-center gap-2 text-slate-600 dark:text-slate-300"><MapPin size={18} /> Simulated GPS: 28.6139 N, 77.2090 E</p>
          </div>
          <button aria-label="Close SOS modal" className="btn-ghost !p-3" onClick={onClose}><X /></button>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
            <svg className="h-full w-full" viewBox="0 0 500 280">
              <path d="M30 220 C120 80, 240 230, 470 70" fill="none" stroke="#94A3B8" strokeWidth="18" strokeLinecap="round" />
              <circle cx="430" cy="82" r="18" fill="#EF4444" />
              <motion.g animate={{ x: [20, 390], y: [200, 62] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <rect width="54" height="34" rx="8" fill="#2563EB" />
                <rect x="8" y="8" width="16" height="16" fill="white" />
                <path d="M14 12v8M10 16h8" stroke="#EF4444" strokeWidth="3" />
              </motion.g>
            </svg>
          </div>
          <div className="space-y-4">
            <div className="card bg-red-50 dark:bg-red-950/40">
              <p className="text-sm text-slate-500">Ambulance ETA</p>
              <p className="mt-1 text-4xl font-extrabold text-care-danger">{eta}:00</p>
            </div>
            {["Emergency Contact", "Primary Doctor", "Hospital Desk"].map((name) => (
              <button key={name} className="btn-primary w-full justify-between"><span>{name}</span><Phone size={18} /></button>
            ))}
            <button className="btn-ghost w-full border border-slate-200 dark:border-slate-700" onClick={() => window.confirm("Cancel emergency alert?") && onClose()}>Cancel alert</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
