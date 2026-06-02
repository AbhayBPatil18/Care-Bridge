import { Appointment, ChatMessage, Doctor, HealthMetric, MedicalHistoryEntry, Medication, Notification, User } from "../types";

export const demoUsers: User[] = [
  { id: "patient-1", name: "John Doe", email: "john.doe@demo.com", role: "patient", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop", status: "active" },
  { id: "doctor-1", name: "Dr. Maya Smith", email: "dr.smith@demo.com", role: "doctor", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop", status: "active" },
  { id: "admin-1", name: "Avery Admin", email: "admin@demo.com", role: "admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop", status: "active" }
];

export const doctors: Doctor[] = [
  { id: "doctor-1", name: "Dr. Maya Smith", specialty: "Cardiology", rating: 4.9, photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=220&fit=crop", available: true },
  { id: "doctor-2", name: "Dr. Ethan Kim", specialty: "Neurology", rating: 4.8, photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=220&fit=crop", available: true },
  { id: "doctor-3", name: "Dr. Lina Patel", specialty: "Dermatology", rating: 4.7, photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=220&fit=crop", available: false },
  { id: "doctor-4", name: "Dr. Omar Wells", specialty: "Orthopedics", rating: 4.8, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=220&fit=crop", available: true }
];

export const metrics: HealthMetric[] = [
  { day: "Mon", heartRate: 72, steps: 6420, sleep: 7.1, systolic: 118, diastolic: 76, oxygen: 98 },
  { day: "Tue", heartRate: 76, steps: 7300, sleep: 6.8, systolic: 122, diastolic: 78, oxygen: 97 },
  { day: "Wed", heartRate: 71, steps: 8100, sleep: 7.5, systolic: 116, diastolic: 74, oxygen: 99 },
  { day: "Thu", heartRate: 79, steps: 5600, sleep: 6.4, systolic: 126, diastolic: 82, oxygen: 96 },
  { day: "Fri", heartRate: 74, steps: 9200, sleep: 7.9, systolic: 119, diastolic: 77, oxygen: 98 },
  { day: "Sat", heartRate: 70, steps: 10400, sleep: 8.2, systolic: 115, diastolic: 73, oxygen: 99 },
  { day: "Sun", heartRate: 73, steps: 8800, sleep: 7.4, systolic: 117, diastolic: 75, oxygen: 98 }
];

export const appointments: Appointment[] = [
  { id: "a1", patientId: "patient-1", patientName: "John Doe", doctorId: "doctor-1", doctorName: "Dr. Maya Smith", specialty: "Cardiology", date: "2026-06-03", time: "09:30", status: "confirmed", type: "Follow-up" },
  { id: "a2", patientId: "patient-1", patientName: "John Doe", doctorId: "doctor-2", doctorName: "Dr. Ethan Kim", specialty: "Neurology", date: "2026-06-07", time: "11:00", status: "waiting", type: "Consultation" },
  { id: "a3", patientId: "patient-2", patientName: "Nora Lee", doctorId: "doctor-1", doctorName: "Dr. Maya Smith", specialty: "Cardiology", date: "2026-06-02", time: "10:30", status: "in-progress", type: "Review" },
  { id: "a4", patientId: "patient-3", patientName: "Miles Chen", doctorId: "doctor-1", doctorName: "Dr. Maya Smith", specialty: "Cardiology", date: "2026-06-02", time: "12:15", status: "waiting", type: "New Visit" },
  { id: "a5", patientId: "patient-4", patientName: "Ria Khan", doctorId: "doctor-3", doctorName: "Dr. Lina Patel", specialty: "Dermatology", date: "2026-06-09", time: "15:00", status: "confirmed", type: "Procedure" }
];

export const medications: Medication[] = [
  { id: "m1", name: "Atorvastatin", dosage: "10 mg", frequency: "Daily", time: "08:00", slot: "Morning", taken: true },
  { id: "m2", name: "Vitamin D3", dosage: "1000 IU", frequency: "Daily", time: "09:00", slot: "Morning", taken: true },
  { id: "m3", name: "Metformin", dosage: "500 mg", frequency: "Twice daily", time: "13:00", slot: "Afternoon", taken: false },
  { id: "m4", name: "Omega-3", dosage: "1 cap", frequency: "Daily", time: "18:00", slot: "Evening", taken: false },
  { id: "m5", name: "Melatonin", dosage: "3 mg", frequency: "As needed", time: "22:00", slot: "Night", taken: false },
  { id: "m6", name: "Aspirin", dosage: "81 mg", frequency: "Daily", time: "20:00", slot: "Evening", taken: false },
  { id: "m7", name: "Magnesium", dosage: "250 mg", frequency: "Daily", time: "21:00", slot: "Night", taken: true },
  { id: "m8", name: "Probiotic", dosage: "1 cap", frequency: "Daily", time: "07:30", slot: "Morning", taken: false }
];

export const chatMessages: ChatMessage[] = [
  { id: "c1", sender: "ai", text: "Hi John, I can help with symptoms, medication questions, wellness planning, and when to seek urgent care.", timestamp: "08:30", read: true },
  { id: "c2", sender: "user", text: "I have a headache and feel tired.", timestamp: "08:31", read: true },
  { id: "c3", sender: "ai", text: "A headache with fatigue can come from sleep loss, dehydration, stress, or infection. Drink water, rest, and monitor your temperature.", timestamp: "08:31", read: true },
  { id: "c4", sender: "user", text: "When is it urgent?", timestamp: "08:32", read: true },
  { id: "c5", sender: "ai", text: "Seek emergency help for sudden severe headache, weakness, confusion, chest pain, fainting, or trouble breathing.", timestamp: "08:32", read: true }
];

export const notifications: Notification[] = Array.from({ length: 15 }, (_, index) => ({
  id: `n${index + 1}`,
  type: (["appointment", "medication", "tip", "system"] as const)[index % 4],
  title: ["Appointment reminder", "Medication due", "Health tip", "System update"][index % 4],
  body: ["Cardiology follow-up tomorrow", "Metformin dose is pending", "A short walk improves glucose control", "New lab upload workflow available"][index % 4],
  read: index > 5,
  timestamp: `${8 + index}:00`
}));

export const history: MedicalHistoryEntry[] = Array.from({ length: 10 }, (_, index) => ({
  id: `h${index + 1}`,
  date: `202${4 + Math.floor(index / 5)}-${String((index % 12) + 1).padStart(2, "0")}-14`,
  doctor: doctors[index % doctors.length].name,
  condition: ["Cardiac", "Respiratory", "Dermatology", "General"][index % 4],
  diagnosis: ["Borderline hypertension", "Seasonal allergy", "Migraine pattern", "Routine wellness"][index % 4],
  prescription: ["Lifestyle plan", "Antihistamine", "Riboflavin support", "Preventive screening"][index % 4],
  notes: "Vitals reviewed, patient stable, follow-up advised with routine monitoring."
}));
