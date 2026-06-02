export type Role = "patient" | "doctor" | "admin";
export type Severity = "Low" | "Medium" | "High" | "Emergency";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  status: "active" | "inactive";
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "waiting" | "in-progress" | "completed";
  type: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  slot: "Morning" | "Afternoon" | "Evening" | "Night";
  taken: boolean;
}

export interface HealthMetric {
  day: string;
  heartRate: number;
  steps: number;
  sleep: number;
  systolic: number;
  diastolic: number;
  oxygen: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Notification {
  id: string;
  type: "appointment" | "medication" | "tip" | "system";
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
}

export interface MedicalHistoryEntry {
  id: string;
  date: string;
  doctor: string;
  condition: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  photo: string;
  available: boolean;
}
