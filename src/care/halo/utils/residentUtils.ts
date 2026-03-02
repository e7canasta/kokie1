/**
 * Resident utilities - color extraction, normalization, and room grouping
 */

import type { Resident, RoomGroup } from "../types/resident.types";

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
 * Group residents by room number, preserving order of first appearance.
 * Returns array of RoomGroup sorted by room number.
 */
export function groupResidentsByRoom(residents: Resident[]): RoomGroup[] {
  const map = new Map<string, RoomGroup>();

  for (const r of residents) {
    const existing = map.get(r.room);
    if (existing) {
      existing.residents.push(r);
    } else {
      map.set(r.room, { room: r.room, unit: r.unit, residents: [r] });
    }
  }

  return Array.from(map.values()).sort((a, b) => a.room.localeCompare(b.room));
}
