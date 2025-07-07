import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthenticatedUser } from "@/schemas/auth.schema";
import queryClient from "@/lib/queryClient";
import { getUserById } from "@/services/user.service";

interface AuthContextType {
  user: AuthenticatedUser | null;
  token: string | null;
  login: (user: AuthenticatedUser, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setToken(savedToken);
      } catch {
        logout();
      }
    }
  }, []);

  const login = (user: AuthenticatedUser, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.clear();
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const updatedUser = await queryClient.fetchQuery({
        queryKey: ["users", user.id],
        queryFn: () => getUserById(user.id),
      });
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
