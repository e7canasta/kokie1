/**
 * useResidentNavigation Hook
 *
 * Sprint 2 (P1) - Swipe navigation between residents
 * Calculates prev/next resident for swipe gestures in ResidentOverviewScreen
 *
 * Navigation logic (same-room-first):
 * 1. Prioritize same room (bed order: A → B → C → D)
 * 2. If last bed in room, jump to next room's first bed
 * 3. If first bed in room, jump to previous room's last bed
 *
 * Rationale: La enfermera está físicamente en la habitación,
 * quiere navegar entre camas sin volver al board.
 */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResidents } from "./useResidents";
import { haptics } from "../utils/haptics";

export interface UseResidentNavigationResult {
  currentIndex: number;
  totalResidents: number;
  roomResidentsCount: number; // Cuántos residents en la misma room
  hasPrev: boolean;
  hasNext: boolean;
  prevResident: number | null; // resident ID
  nextResident: number | null; // resident ID
  goToPrev: () => void;
  goToNext: () => void;
  navigationLabel: string; // e.g., "Bed B of 4"
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
        roomResidentsCount: 0,
        hasPrev: false,
        hasNext: false,
        prevResident: null,
        nextResident: null,
        navigationLabel: "",
      };
    }

    const current = residents[currentIndex];

    // Filter residents in same room, sorted by bed
    const roomResidents = residents
      .filter((r) => r.room === current.room)
      .sort((a, b) => (a.bed || '').localeCompare(b.bed || ''));

    const roomIndex = roomResidents.findIndex((r) => r.id === currentResidentId);
    const roomResidentsCount = roomResidents.length;

    // Same-room-first navigation
    const hasPrev = roomIndex > 0 || currentIndex > 0;
    const hasNext = roomIndex < roomResidents.length - 1 || currentIndex < residents.length - 1;

    let prevResident: number | null = null;
    let nextResident: number | null = null;

    // Previous: same room first, then prev room's last bed
    if (roomIndex > 0) {
      prevResident = roomResidents[roomIndex - 1]?.id ?? null;
    } else if (currentIndex > 0) {
      prevResident = residents[currentIndex - 1]?.id ?? null;
    }

    // Next: same room first, then next room's first bed
    if (roomIndex < roomResidents.length - 1) {
      nextResident = roomResidents[roomIndex + 1]?.id ?? null;
    } else if (currentIndex < residents.length - 1) {
      nextResident = residents[currentIndex + 1]?.id ?? null;
    }

    // Navigation label: "Bed B of 4" (emphasize room context)
    const navigationLabel = current.bed
      ? `Bed ${current.bed} of ${roomResidentsCount}`
      : `Room ${current.room}`;

    return {
      currentIndex,
      totalResidents: residents.length,
      roomResidentsCount,
      hasPrev,
      hasNext,
      prevResident,
      nextResident,
      navigationLabel,
    };
  }, [residents, currentResidentId]);

  const goToPrev = () => {
    if (navigationData.prevResident !== null) {
      haptics.selection(); // Light haptic for navigation
      navigate(`/resident/${navigationData.prevResident}`);
    }
  };

  const goToNext = () => {
    if (navigationData.nextResident !== null) {
      haptics.selection(); // Light haptic for navigation
      navigate(`/resident/${navigationData.nextResident}`);
    }
  };

  return {
    ...navigationData,
    goToPrev,
    goToNext,
  };
}
