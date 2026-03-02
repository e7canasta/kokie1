import { create } from 'zustand';
import type { Resident } from '../care/halo/types/resident.types';

interface AppState {
  selectedResidentId: number | null;
  setSelectedResidentId: (id: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedResidentId: null,
  setSelectedResidentId: (id) => set({ selectedResidentId: id }),
}));
