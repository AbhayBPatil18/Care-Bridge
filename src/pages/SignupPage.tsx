import { Camera, HeartPulse } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types";

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await signup({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
      role,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop"
    });
    navigate("/");
  }
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4 dark:bg-slate-950">
      <form onSubmit={submit} className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-soft dark:bg-slate-900">
        <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-care-primary text-white"><HeartPulse /></span><h1 className="text-2xl font-extrabold">Create profile</h1></div>
        <div className="mt-6 grid gap-4">
          <input className="input" name="name" placeholder="Full name" required />
          <input className="input" name="email" placeholder="Email" type="email" required />
          <input className="input" name="password" placeholder="Password" type="password" minLength={6} required />
          <div className="grid grid-cols-3 gap-2">{(["patient", "doctor", "admin"] as Role[]).map((item) => <button key={item} type="button" className={`rounded-2xl border px-3 py-3 text-sm font-bold capitalize ${role === item ? "border-care-primary bg-blue-50 text-care-primary dark:bg-blue-950" : "border-slate-200 dark:border-slate-700"}`} onClick={() => setRole(item)}>{item}</button>)}</div>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700"><Camera /> Profile photo upload simulation<input hidden type="file" /></label>
          <button className="btn-primary">Sign up</button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500"><Link className="font-bold text-care-primary" to="/login">Back to login</Link></p>
      </form>
    </div>
  );
}
