import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SosModal } from "./components/SosModal";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";


const DashboardPage = lazy(() => import("./pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const ChatbotPage = lazy(() => import("./pages/ChatbotPage").then((module) => ({ default: module.ChatbotPage })));
const SymptomCheckerPage = lazy(() => import("./pages/SymptomCheckerPage").then((module) => ({ default: module.SymptomCheckerPage })));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage").then((module) => ({ default: module.AppointmentPage })));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage").then((module) => ({ default: module.AnalyticsPage })));
const HistoryPage = lazy(() => import("./pages/HistoryPage").then((module) => ({ default: module.HistoryPage })));
const MedicinePage = lazy(() => import("./pages/MedicinePage").then((module) => ({ default: module.MedicinePage })));

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Layout>{children}</Layout>;
}

export function App() {
  const [sosOpen, setSosOpen] = useState(false);
  useEffect(() => {
    const open = () => setSosOpen(true);
    window.addEventListener("carebridge:sos", open);
    return () => window.removeEventListener("carebridge:sos", open);
  }, []);
  return (
    <>
      <Suspense fallback={<div className="grid min-h-screen place-items-center text-care-primary">Loading Care Bridge...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Protected><DashboardPage /></Protected>} />
          <Route path="/chatbot" element={<Protected><ChatbotPage /></Protected>} />
          <Route path="/symptoms" element={<Protected><SymptomCheckerPage /></Protected>} />
          <Route path="/appointments" element={<Protected><AppointmentPage /></Protected>} />
          <Route path="/analytics" element={<Protected><AnalyticsPage /></Protected>} />
          <Route path="/history" element={<Protected><HistoryPage /></Protected>} />
          <Route path="/medicines" element={<Protected><MedicinePage /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <SosModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}
