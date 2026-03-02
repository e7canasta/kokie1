/**
 * Rounding Route Optimization
 *
 * Cuando rounding está activo, reordena rooms por prioridad:
 * 1. Alert rooms (Low wellness) — prioritario
 * 2. Overdue rooms — necesitan atención
 * 3. Trending down — deterioro predictivo
 * 4. Pending rooms — normal flow
 * 5. Visited rooms — completados (al final)
 *
 * Algoritmo:
 * - Calcula score compuesto por severity, status, trending
 * - Ordena descendente por score
 * - Preserva orden original en caso de empate
 */

import type { RoomGroup, Resident } from '../types/resident.types';
import { analyzeWellnessTrend } from './wellnessTrending';

export interface RoomPriority {
  room: string;
  score: number;
  reasons: string[];
}

/**
 * Calculate priority score for a room
 */
export function calculateRoomPriority(roomGroup: RoomGroup): number {
  let score = 0;
  const reasons: string[] = [];

  // Check for alerts (Low wellness) — highest priority
  const alertCount = roomGroup.residents.filter((r) => r.wellness?.trend === 'Low').length;
  if (alertCount > 0) {
    score += 1000 * alertCount; // 1000 points per alert
    reasons.push(`${alertCount} alert${alertCount > 1 ? 's' : ''}`);
  }

  // Check for overdue status
  if (roomGroup.roundingStatus === 'overdue') {
    score += 500; // 500 points for overdue
    reasons.push('overdue');

    // Additional priority for how long overdue
    if (roomGroup.lastVisitedMinutesAgo) {
      score += roomGroup.lastVisitedMinutesAgo; // +1 per minute overdue
    }
  }

  // Check for trending down (deterioro)
  const trendingDownCount = roomGroup.residents.filter((r) => {
    const trend = analyzeWellnessTrend(r.wellness);
    return trend.direction === 'down';
  }).length;

  if (trendingDownCount > 0) {
    score += 200 * trendingDownCount; // 200 points per trending down
    reasons.push(`${trendingDownCount} trending down`);
  }

  // Pending rooms get baseline score
  if (roomGroup.roundingStatus === 'pending') {
    score += 100; // 100 points for pending
  }

  // Visited rooms get lowest priority (negative to push to end)
  if (roomGroup.roundingStatus === 'visited') {
    score = -1000; // Push to end
  }

  return score;
}

/**
 * Optimize room order for rounding
 */
export function optimizeRoundingRoute(rooms: RoomGroup[]): RoomGroup[] {
  // Calculate priority for each room
  const roomsWithPriority = rooms.map((room, index) => ({
    room,
    priority: calculateRoomPriority(room),
    originalIndex: index, // preserve original order for tie-breaking
  }));

  // Sort by priority (descending), then by original index
  roomsWithPriority.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return a.originalIndex - b.originalIndex; // Preserve original order on tie
  });

  return roomsWithPriority.map((item) => item.room);
}

/**
 * Get next room to visit during active rounding
 */
export function getNextRoomInRoute(rooms: RoomGroup[]): RoomGroup | null {
  const optimized = optimizeRoundingRoute(rooms);

  // Find first non-visited room
  const nextRoom = optimized.find((r) => r.roundingStatus !== 'visited');

  return nextRoom || null;
}

/**
 * Calculate route completion percentage
 */
export function calculateRouteProgress(rooms: RoomGroup[]): {
  visited: number;
  total: number;
  percentage: number;
  remaining: number;
} {
  const visited = rooms.filter((r) => r.roundingStatus === 'visited').length;
  const total = rooms.length;
  const percentage = total > 0 ? Math.round((visited / total) * 100) : 0;
  const remaining = total - visited;

  return { visited, total, percentage, remaining };
}

/**
 * Get priority label for UI
 */
export function getPriorityLabel(score: number): string {
  if (score >= 1000) return 'URGENT';
  if (score >= 500) return 'HIGH';
  if (score >= 200) return 'MEDIUM';
  if (score >= 100) return 'NORMAL';
  if (score < 0) return 'COMPLETED';
  return 'LOW';
}

/**
 * Get priority color for UI
 */
export function getPriorityColor(score: number): string {
  if (score >= 1000) return '#B71C1C'; // Dark red
  if (score >= 500) return '#F44336'; // Red
  if (score >= 200) return '#FF9800'; // Orange
  if (score >= 100) return '#2196F3'; // Blue
  return '#9E9E9E'; // Gray
}
