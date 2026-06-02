import { User as FirebaseUser, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { demoUsers } from "../data/demoData";
import { auth } from "../services/firebase.config";
import { Role, User } from "../types";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (user: Omit<User, "id" | "status"> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(firebaseUser: FirebaseUser, role: Role = "patient"): User {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName ?? "Care Bridge User",
    email: firebaseUser.email ?? "",
    role,
    avatar: firebaseUser.photoURL ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop",
    status: "active"
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("carebridge:user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("carebridge:user", JSON.stringify(user));
    else localStorage.removeItem("carebridge:user");
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const demo = demoUsers.find((candidate) => candidate.email === email && password === "demo123");
    if (demo) {
      setUser(demo);
      toast.success(`Welcome, ${demo.name}`);
      return;
    }
    if (!auth) throw new Error("Firebase is not configured. Use a demo account or add .env keys.");
    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(mapFirebaseUser(credential.user));
  }, []);

  const signup = useCallback(async (newUser: Omit<User, "id" | "status"> & { password: string }) => {
    const created = { ...newUser, id: crypto.randomUUID(), status: "active" as const };
    setUser(created);
    toast.success("Profile created for demo session");
  }, []);

  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
