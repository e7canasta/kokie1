/**
 * Resident utilities - color extraction and normalization for avatar gradients
 */

const DEFAULT_AVATAR_COLORS = ["#8B4A5E", "#A0586A", "#D4A0B0"];

/**
 * Extract hex colors from a gradient string (e.g. "linear-gradient(135deg, #2E7D6F, #1B5E50)")
 * Returns [color1, color2, color2WithAlpha] for avatar use
 */
export function extractColorsFromGradient(gradient: string): string[] {
  const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1], matches[1] + "80"];
  }
  return [...DEFAULT_AVATAR_COLORS];
}

/**
 * Ensure a resident has colors array from avatarGradient or default
 */
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
