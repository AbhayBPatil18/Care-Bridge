import { Activity, BarChart3, Bell, Bot, CalendarPlus, HeartPulse, Home, LogOut, Menu, Mic, Moon, Pill, Shield, Stethoscope, Sun } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppData } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { useVoiceCommand } from "../hooks/useVoiceCommand";
import { SosModal } from "./SosModal";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/chatbot", label: "Chat", icon: Bot },
  { href: "/symptoms", label: "Symptoms", icon: Stethoscope },
  { href: "/appointments", label: "Book", icon: CalendarPlus },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/history", label: "History", icon: Activity },
  { href: "/medicines", label: "Meds", icon: Pill }
];

export function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const [sosOpen, setSosOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { listening, transcript, startListening } = useVoiceCommand(() => setSosOpen(true));
  const navigate = useNavigate();
  const unread = notifications.filter((item) => !item.read).length;

  const visibleNav = user?.role === "admin" ? [{ href: "/", label: "Admin", icon: Shield }, { href: "/analytics", label: "Analytics", icon: BarChart3 }] : navItems;

  return (
    <div className="min-h-screen bg-slate-50 transition dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 glass dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-care-primary to-care-teal text-white"><HeartPulse /></span>
            <span className="text-xl font-extrabold">Care Bridge</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {visibleNav.map(({ href, label, icon: Icon }) => (
              <NavLink key={href} to={href} className={({ isActive }) => `rounded-2xl px-3 py-2 text-sm font-semibold ${isActive ? "bg-blue-100 text-care-primary dark:bg-blue-950" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}><Icon className="mr-2 inline" size={16} />{label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button title="Toggle theme" className="btn-ghost !p-3" onClick={toggleTheme}>{dark ? <Sun /> : <Moon />}</button>
            <div className="relative">
              <button title="Notifications" className="btn-ghost !p-3" onClick={() => setNotifOpen((value) => !value)}><Bell />{unread > 0 && <span className="absolute right-1 top-1 rounded-full bg-care-danger px-1.5 text-xs text-white">{unread}</span>}</button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 flex items-center justify-between"><b>Notifications</b><button className="text-xs font-semibold text-care-primary" onClick={markAllNotificationsRead}>Mark all read</button></div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.slice(0, 8).map((item) => (
                      <button key={item.id} className="mb-2 w-full rounded-2xl p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => markNotificationRead(item.id)}>
                        <p className="text-sm font-bold">{item.title}</p><p className="text-xs text-slate-500">{item.body}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="hidden rounded-full bg-slate-100 p-1 pr-3 text-sm font-semibold dark:bg-slate-800 sm:flex" onClick={() => navigate("/")}>
              <img src={user?.avatar} alt="" className="mr-2 h-9 w-9 rounded-full object-cover" />{user?.name}
            </button>
            <button title="Logout" className="btn-ghost !p-3" onClick={logout}><LogOut /></button>
            <button className="btn-ghost !p-3 lg:hidden" onClick={() => setMenuOpen((value) => !value)}><Menu /></button>
          </div>
        </div>
        {menuOpen && <div className="grid gap-1 px-4 pb-3 lg:hidden">{visibleNav.map(({ href, label }) => <NavLink key={href} to={href} className="rounded-2xl px-3 py-2 font-semibold">{label}</NavLink>)}</div>}
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6">{children}</main>
      <button title="Voice command" className={`fixed bottom-20 right-5 z-30 h-16 w-16 rounded-full text-white shadow-2xl ${listening ? "animate-pulse bg-care-danger" : "bg-care-primary"}`} onClick={() => { toast("Listening for a command"); startListening(); }}><Mic className="mx-auto" /></button>
      {transcript && <div className="fixed bottom-40 right-5 z-30 rounded-2xl bg-slate-900 px-4 py-2 text-sm text-white">{transcript}</div>}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        {visibleNav.slice(0, 5).map(({ href, label, icon: Icon }) => <NavLink key={href} to={href} className="grid place-items-center gap-1 rounded-xl py-2 text-xs font-semibold"><Icon size={18} />{label}</NavLink>)}
      </nav>
      <SosModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </div>
  );
}
