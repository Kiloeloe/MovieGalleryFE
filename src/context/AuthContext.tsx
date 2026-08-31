import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { authApi } from "../api/client";

interface AuthContextValue {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = useCallback(async (username: string, password: string) => {
    const result = await authApi.login({ username, password });
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", result.username);
    setUsername(result.username);
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const result = await authApi.register({ username, password });
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", result.username);
    setUsername(result.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  }, []);

  const value: AuthContextValue = {
    username,
    isAuthenticated: !!username && !!localStorage.getItem("token"),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
