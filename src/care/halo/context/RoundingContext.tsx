import { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Rounding State
 *
 * Filosofía "Permeable Feature Discovery":
 * - roundType es string libre (no enum rígido)
 * - Si el geriátrico no usa tipos, simplemente no selecciona
 * - La funcionalidad no se bloquea por features opcionales
 */
export interface RoundingState {
  isActive: boolean;
  roundType: string | null; // Permeable: texto libre o preset
  startedAt: Date | null;
  visitedRooms: string[]; // room IDs
  totalRooms: number;
  currentRoomIndex: number; // para "Next" navigation
}

interface RoundingContextType {
  state: RoundingState;
  startRounding: (totalRooms: number, roundType?: string) => void;
  endRounding: () => void;
  markRoomVisited: (roomId: string) => void;
  goToNextRoom: () => void;
  getRoundingProgress: () => { visited: number; total: number; percentage: number };
}

const RoundingContext = createContext<RoundingContextType | undefined>(undefined);

const initialState: RoundingState = {
  isActive: false,
  roundType: null,
  startedAt: null,
  visitedRooms: [],
  totalRooms: 0,
  currentRoomIndex: 0,
};

/**
 * RoundingProvider
 *
 * Gestiona el estado de la ronda activa:
 * - START ROUNDING → isActive = true
 * - Trackea rooms visitadas
 * - Progress indicator
 * - Auto-advance
 */
export function RoundingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RoundingState>(initialState);

  const startRounding = (totalRooms: number, roundType?: string) => {
    setState({
      isActive: true,
      roundType: roundType || null,
      startedAt: new Date(),
      visitedRooms: [],
      totalRooms,
      currentRoomIndex: 0,
    });
  };

  const endRounding = () => {
    setState(initialState);
  };

  const markRoomVisited = (roomId: string) => {
    setState((prev) => {
      // Evitar duplicados
      if (prev.visitedRooms.includes(roomId)) {
        return prev;
      }

      return {
        ...prev,
        visitedRooms: [...prev.visitedRooms, roomId],
      };
    });
  };

  const goToNextRoom = () => {
    setState((prev) => ({
      ...prev,
      currentRoomIndex: Math.min(prev.currentRoomIndex + 1, prev.totalRooms - 1),
    }));
  };

  const getRoundingProgress = () => {
    const visited = state.visitedRooms.length;
    const total = state.totalRooms;
    const percentage = total > 0 ? Math.round((visited / total) * 100) : 0;

    return { visited, total, percentage };
  };

  return (
    <RoundingContext.Provider
      value={{
        state,
        startRounding,
        endRounding,
        markRoomVisited,
        goToNextRoom,
        getRoundingProgress,
      }}
    >
      {children}
    </RoundingContext.Provider>
  );
}

/**
 * Hook para usar RoundingContext
 */
export function useRounding() {
  const context = useContext(RoundingContext);
  if (!context) {
    throw new Error('useRounding must be used within RoundingProvider');
  }
  return context;
}

/**
 * Round Type Presets (opcionales)
 *
 * El geriátrico puede usar estos presets o texto libre.
 * Esto es solo para UX sugerida, no requirimiento.
 */
export const ROUND_TYPE_PRESETS = [
  'Medicación',
  'Observación',
  'Vigía',
  'Alimentación',
  'General',
] as const;

export type RoundTypePreset = (typeof ROUND_TYPE_PRESETS)[number];
