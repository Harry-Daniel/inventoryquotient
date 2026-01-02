import { create } from "zustand";

export const useAuthetication = create((set) => ({
  authenticated: true,
  login: () => set({ authenticated: true }),
  logout: () => set({ authenticated: false }),
}));
