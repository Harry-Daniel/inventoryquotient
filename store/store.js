import { create } from "zustand";

export const useAuthetication = create((set) => ({
  authenticated: true,
  login: () => set({ authenticated: true }),
  logout: () => set({ authenticated: false }),
}));

export const useData = create((set) => ({
  inventoryItems: [],
  setInventoryItems: (data) => set({ inventoryItems: data }),
}));
