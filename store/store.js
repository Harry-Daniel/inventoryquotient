import { create } from "zustand";

export const useAuthetication = create((set) => ({
  authenticated: false,
  login: () => set({ authenticated: true }),
  logout: () => set({ authenticated: false }),
}));
