/**
 * Favorites (starred residents) - localStorage persistence
 * Permite gestionar favoritos sin backend; se fusiona con el campo starred del API.
 */

const STORAGE_KEY = "halo-favorites";

export function getStarredIdsFromStorage(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is number => typeof x === "number"));
  } catch {
    return new Set();
  }
}

export function setStarredIdsToStorage(ids: Set<number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}
