import { motion } from "framer-motion";
import { HeartPulse, LogIn } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("john.doe@demo.com");
  const [password, setPassword] = useState("demo123");
  const [remember, setRemember] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      if (!email.includes("@") || password.length < 6) throw new Error("Enter a valid email and password.");
      await login(email, password, remember);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,#DBEAFE,transparent_34%),linear-gradient(135deg,#F8FAFC,#CCFBF1)] p-4 dark:bg-[radial-gradient(circle_at_top_left,#1E3A8A,transparent_30%),linear-gradient(135deg,#020617,#0F172A)]">
      <motion.form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <motion.div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-care-primary to-care-teal text-white" animate={{ rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 4 }}><HeartPulse size={38} /></motion.div>
        <h1 className="mt-6 text-center text-3xl font-extrabold">Care Bridge</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Post-treatment follow-up and readmission prevention</p>
        <div className="mt-6 space-y-4">
          <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
          <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Remember me</label>
          <button className="btn-primary w-full" type="submit"><LogIn size={18} />Login</button>
          <button type="button" className="btn-ghost w-full border border-slate-200 dark:border-slate-700" onClick={() => { setEmail("john.doe@demo.com"); setPassword("demo123"); }}>Demo Login</button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">New here? <Link className="font-bold text-care-primary" to="/signup">Create account</Link></p>
      </motion.form>
    </div>
  );
}
