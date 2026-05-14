import React, { useContext, useState, useCallback, useEffect } from "react";
import type { User } from "../types";
import { ADMIN_EMAIL, ADMIN_PASS } from "../utils/constants";
import { AuthCtx, ToastCtx } from "./index";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const showToast = useContext(ToastCtx);
  if (!showToast) throw new Error("ToastContext not found");
  
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("drip_user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("drip_user", JSON.stringify(user));
    else localStorage.removeItem("drip_user");
  }, [user]);

  const login = useCallback((email: string, password: string, name?: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const u: User = { email, name: "Admin", isAdmin: true, token: "admin_" + Date.now() };
      setUser(u);
      showToast("Welcome back, Admin 👑");
      return { isAdmin: true };
    }
    const u: User = { email, name: name || email.split("@")[0], isAdmin: false, token: "user_" + Date.now() };
    setUser(u);
    showToast("Welcome, " + u.name + "! 👋");
    return { isAdmin: false };
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast("Logged out");
  }, [showToast]);

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
