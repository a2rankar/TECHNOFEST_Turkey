import { create } from "zustand";

interface AppState {
  selectedZone: number | null;
  setSelectedZone: (id: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedZone: null,
  setSelectedZone: (id) => set({ selectedZone: id }),
}));
