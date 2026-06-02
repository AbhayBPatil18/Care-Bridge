import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { appointments as seedAppointments, medications as seedMedications, notifications as seedNotifications } from "../data/demoData";
import { Appointment, Medication, Notification } from "../types";

interface AppContextValue {
  appointments: Appointment[];
  medications: Medication[];
  notifications: Notification[];
  addAppointment: (appointment: Appointment) => void;
  toggleMedication: (id: string) => void;
  addMedication: (medication: Medication) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState(seedAppointments);
  const [medications, setMedications] = useState(seedMedications);
  const [notifications, setNotifications] = useState(seedNotifications);

  const value = useMemo<AppContextValue>(() => ({
    appointments,
    medications,
    notifications,
    addAppointment: (appointment) => setAppointments((items) => [appointment, ...items]),
    toggleMedication: (id) => setMedications((items) => items.map((item) => item.id === id ? { ...item, taken: !item.taken } : item)),
    addMedication: (medication) => setMedications((items) => [medication, ...items]),
    markNotificationRead: (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: true } : item)),
    markAllNotificationsRead: () => setNotifications((items) => items.map((item) => ({ ...item, read: true })))
  }), [appointments, medications, notifications]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useAppData must be used inside AppProvider");
  return value;
}
