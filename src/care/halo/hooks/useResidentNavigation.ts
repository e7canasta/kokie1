/**
 * useResidentNavigation Hook
 *
 * Sprint 2 (P1) - Swipe navigation between residents
 * Calculates prev/next resident for swipe gestures in ResidentOverviewScreen
 *
 * Navigation logic:
 * - Same room first (bed order)
 * - Then next/prev room
 */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResidents } from "./useResidents";

export interface UseResidentNavigationResult {
  currentIndex: number;
  totalResidents: number;
  hasPrev: boolean;
  hasNext: boolean;
  prevResident: number | null; // resident ID
  nextResident: number | null; // resident ID
  goToPrev: () => void;
  goToNext: () => void;
  navigationLabel: string; // e.g., "Room 201 · Bed B"
}

export function useResidentNavigation(currentResidentId: number): UseResidentNavigationResult {
  const navigate = useNavigate();
  const { residents } = useResidents();

  const navigationData = useMemo(() => {
    const currentIndex = residents.findIndex((r) => r.id === currentResidentId);
    if (currentIndex === -1) {
      return {
        currentIndex: -1,
        totalResidents: residents.length,
        hasPrev: false,
        hasNext: false,
        prevResident: null,
        nextResident: null,
        navigationLabel: "",
      };
    }

    const current = residents[currentIndex];
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < residents.length - 1;
    const prevResident = hasPrev ? residents[currentIndex - 1]?.id ?? null : null;
    const nextResident = hasNext ? residents[currentIndex + 1]?.id ?? null : null;

    // Navigation label: "Room 201 · Bed B" or just "Room 201" if no bed
    const navigationLabel = current.bed
      ? `Room ${current.room} · Bed ${current.bed}`
      : `Room ${current.room}`;

    return {
      currentIndex,
      totalResidents: residents.length,
      hasPrev,
      hasNext,
      prevResident,
      nextResident,
      navigationLabel,
    };
  }, [residents, currentResidentId]);

  const goToPrev = () => {
    if (navigationData.prevResident !== null) {
      navigate(`/resident/${navigationData.prevResident}`);
    }
  };

  const goToNext = () => {
    if (navigationData.nextResident !== null) {
      navigate(`/resident/${navigationData.nextResident}`);
    }
  };

  return {
    ...navigationData,
    goToPrev,
    goToNext,
  };
}
