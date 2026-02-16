import { create } from "zustand";

export const useAuthetication = create((set) => ({
  authenticated: false,
  login: () => set({ authenticated: true }),
  logout: () => set({ authenticated: false }),
}));

export const useData = create((set) => ({
  inventoryItems: [],
  indexedList:[],
  setInventoryItems: (data) => set({ inventoryItems: data }),
  setIndexedList: (newItems) =>
    set({
      indexedList: Object.fromEntries(newItems.map((i) => [i.id, i])),
    }),
}));
