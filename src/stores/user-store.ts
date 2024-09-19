import { create } from "zustand";

interface User {
  role: "admin" | "user";
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  isLoggedIn: () => get().user !== null,
  isAdmin: () => get().user?.role === "admin",
  isUser: () => get().user?.role === "user",
}));
