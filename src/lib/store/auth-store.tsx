import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string
  ) => Promise<void>;
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
      const response = await fetch("/api/me");
      const data = await response.json();

      console.log("Auth initialization response:", data);

      if (response.ok && data.user) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
        // console.log("User authenticated:", data.user);
      } else {
        console.log("Authentication failed:", data.detail);
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error("Error during auth initialization:", error);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const { user } = await response.json();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  signup: async (
    username,
    email,
    password,
    first_name,
    last_name,
    phone_number
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name,
          last_name,
          phone_number,
          role: "user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        //   console.error("Signup error:", errorData);
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
      await fetch("/api/auth/logout", { method: "POST" });
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.log(error, "error from auth-store.tsx");
      set({ error: "Logout failed", isLoading: false });
    }
  },
}));
