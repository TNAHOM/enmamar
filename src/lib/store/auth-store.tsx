import { userProfile, SignupFormData } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: userProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: (
    phone_number: string,
    password: string
  ) => Promise<{ detail: { data: { is_active: boolean } }; status: number }>;
  signup: (
    data: SignupFormData
  ) => Promise<{ detail: string; status: number; user?: userProfile }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      let response = await fetch("/api/me", { credentials: "include" });
      // Attempt token refresh if unauthorized
      if (response.status === 401) {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (refreshRes.ok) {
          response = await fetch("/api/me", { credentials: "include" });
        } else {
          // Refresh failed: clear auth state
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }
      }
      const data = await response.json();

      if (response.ok) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.warn("Error during auth initialization:", error);
      set({
        error: "Failed to initialize auth",
        isLoading: false,
        user: null,
        isAuthenticated: false,
      });
    }
  },

  login: async (phone_number, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ error: data.detail || "Login failed", isLoading: false });
        // throw new Error(errorData.detail || "Login failed");
        return { detail: data.detail, status: response.status };
      }

      // const { user } = await response.json();
      // set({ user, isAuthenticated: true, isLoading: false });
      set({ user: data.user, isAuthenticated: true, isLoading: false });

      return { detail: "Login successful", status: response.status };
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, isLoading: false });
      return { detail: err.message, status: 500 };
    }
  },

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const message = responseData.detail || "Signup failed";
        set({ error: message, isLoading: false });
        return { detail: message, status: response.status };
      }

      // Ensure user is present in response
      if (!responseData.user) {
        const message =
          responseData.detail || "Signup succeeded but no user data returned";
        set({ error: message, isLoading: false });
        return { detail: message, status: response.status };
      }
      const newUser = responseData.user;
      set({ user: newUser, isAuthenticated: true, isLoading: false });
      return {
        detail: responseData.detail || "Signup successful",
        status: response.status,
        user: newUser,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup error";
      set({ error: message, isLoading: false });
      return { detail: message, status: 500 };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.log(error, "error from auth-store.tsx");
      set({ error: "Logout failed", isLoading: false });
    }
  },
}));
