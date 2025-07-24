import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { username: string; fullname: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  checkAuth: () => void;
}

function handleAsync<T>(fn: () => Promise<T>, loadingHandler: (loading: boolean) => void) {
  return async () => {
    loadingHandler(true);
    try {
      await fn();
    } finally {
      loadingHandler(false);
    }
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      setCookie(null, "JwtToken", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      set({ user, token, isAuthenticated: true });
      toast.success("Login Successful");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Oops! Failed to login. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  register: async ({ username, fullname, email, password }) => {
    set({ loading: true });
    try {
      await axios.post("/api/auth/register", { username, fullname, email, password });
      toast.success("Registration successful! Please login.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch {
      // Ignore errors
    }
    destroyCookie(null, "JwtToken");
    set({ user: null, token: null, isAuthenticated: false });
    toast.info("Logged out successfully");
  },

  forgotPassword: async (email: string) => {
    set({ loading: true });
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset email.");
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async ({ token, newPassword }) => {
    set({ loading: true });
    try {
      await axios.post("/api/auth/reset-password", { token, newPassword });
      toast.success("Password reset successful! Please login.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token }),
  
  checkAuth: () => {
    const token = parseCookies(null).JwtToken;
    set({ token: token || null, isAuthenticated: !!token });
  },
}));
