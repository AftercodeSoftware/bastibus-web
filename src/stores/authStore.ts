import { create } from "zustand";

interface AuthState {
  userRole: string | null;
  isAuthenticated: boolean;
  setAuth: (role: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  userRole: null,
  isAuthenticated: false,
  setAuth: (role) => set({ userRole: role, isAuthenticated: true }),
  logout: () => set({ userRole: null, isAuthenticated: false }),
}));

export default useAuthStore;
