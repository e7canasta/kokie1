import { create } from 'zustand';
import type { Resident } from '../care/halo/types/resident.types';

/**
 * Global app state. selectedResidentId is set on navigation to resident detail
 * so it can be used for sync with URL or cross-screen context (e.g. breadcrumbs).
 */
interface AppState {
  selectedResidentId: number | null;
  setSelectedResidentId: (id: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedResidentId: null,
  setSelectedResidentId: (id) => set({ selectedResidentId: id }),
}));
