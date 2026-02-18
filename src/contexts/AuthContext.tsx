import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name: string;
  organization: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  demoLogin: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  organization: string;
  role: string;
  country: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  email: "demo@forecare.com",
  name: "Dr. Anna Weber",
  organization: "Sunrise Senior Living",
  role: "Care Manager",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("forecare_user");
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (u: User) => {
    sessionStorage.setItem("forecare_user", JSON.stringify(u));
    setUser(u);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock: accept demo credentials or any valid-looking input
    if (
      (email === "demo@forecare.com" && password === "Demo1234!") ||
      (email.includes("@") && password.length >= 6)
    ) {
      persist({
        email,
        name: email === "demo@forecare.com" ? "Dr. Anna Weber" : email.split("@")[0],
        organization: "Sunrise Senior Living",
        role: "Care Manager",
      });
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    persist({
      email: data.email,
      name: data.name,
      organization: data.organization,
      role: data.role,
    });
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("forecare_user");
    setUser(null);
  };

  const demoLogin = () => {
    persist(DEMO_USER);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, demoLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
