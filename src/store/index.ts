import { create } from 'zustand';

interface Resident {
  id: number;
  name: string;
  room: string;
  age: number;
  wellness: { trend: string; previousTrend: string };
  image: string;
}

interface AppState {
  selectedResidentId: number | null;
  setSelectedResidentId: (id: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedResidentId: null,
  setSelectedResidentId: (id) => set({ selectedResidentId: id }),
}));
