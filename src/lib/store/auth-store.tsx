import { userProfile, SignupFormData } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: userProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<{ detail: string; status: number }>;
  signup: (data: SignupFormData) => Promise<void>;
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
      const response = await fetch("/api/me", {
        credentials: "include",
      });
      const data = await response.json();

      console.log("Auth initialization response:", data);

      if (response.ok) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
        // console.log("User authenticated:", data.user);
      } else {
        console.log("Authentication failed:", data.detail);
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

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

      if (!response.ok) {
        const errorData = await response.json();
        console.warn("Signup error:", errorData);
        set({
          error:
            errorData.detail ||
            "An error occurred during signup. Please try again later.",
          isLoading: false,
        });
        return;
      }

      const { user } = await response.json();
      set({ isLoading: false });
      return user;
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, isLoading: false });
      throw error;
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
