/**
 * Resident utilities - color extraction, normalization, and room grouping
 */

import type { Resident, RoomGroup, RoundingStatus, CVStatus } from "../types/resident.types";

const DEFAULT_AVATAR_COLORS = ["#8B4A5E", "#A0586A", "#D4A0B0"];

export function extractColorsFromGradient(gradient: string): string[] {
  const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1], matches[1] + "80"];
  }
  return [...DEFAULT_AVATAR_COLORS];
}

export function withResidentColors<T extends { avatarGradient?: string; colors?: string[] }>(
  resident: T
): T & { colors: string[] } {
  return {
    ...resident,
    colors: resident.avatarGradient
      ? extractColorsFromGradient(resident.avatarGradient)
      : resident.colors ?? DEFAULT_AVATAR_COLORS,
  };
}

/**
 * Mock rounding data -- in production this comes from CV + schedule backend.
 * Maps room number to { status, lastVisitedMinutesAgo }.
 */
const MOCK_ROUNDING: Record<string, { status: RoundingStatus; minutesAgo?: number }> = {
  "201": { status: "visited", minutesAgo: 22 },
  "202": { status: "pending" },
  "203": { status: "visited", minutesAgo: 45 },
  "204": { status: "overdue", minutesAgo: 95 },
};

export function groupResidentsByRoom(residents: Resident[]): RoomGroup[] {
  const map = new Map<string, RoomGroup>();

  for (const r of residents) {
    const existing = map.get(r.room);
    if (existing) {
      existing.residents.push(r);
    } else {
      const rounding = MOCK_ROUNDING[r.room];
      map.set(r.room, {
        room: r.room,
        unit: r.unit,
        residents: [r],
        roundingStatus: rounding?.status ?? "pending",
        lastVisitedMinutesAgo: rounding?.minutesAgo,
      });
    }
  }

  // Calcular cvStatus para cada room basado en residentes
  const groups = Array.from(map.values()).map((group) => {
    const hasAnyCV = group.residents.some((r) => r.hasCV);
    const allHaveCV = group.residents.every((r) => r.hasCV);

    let cvStatus: CVStatus = "none";
    let lastCVDetection: number | undefined;

    if (allHaveCV && hasAnyCV) {
      cvStatus = "active";
      // Usar el lastCVDetection del primer residente (todos deberían ser similares)
      lastCVDetection = group.residents[0]?.lastCVDetection;
    }

    return {
      ...group,
      cvStatus,
      lastCVDetection,
    };
  });

  return groups.sort((a, b) => a.room.localeCompare(b.room));
}
