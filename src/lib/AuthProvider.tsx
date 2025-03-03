"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state when the app loads
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
