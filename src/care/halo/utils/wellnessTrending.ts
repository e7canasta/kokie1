/**
 * Wellness Trending Detection
 *
 * Detecta tendencias de wellness para alertas predictivas:
 * - Trending down (empeorando)
 * - Trending up (mejorando)
 * - Stable (sin cambios)
 *
 * Lógica:
 * - High → Medium = Trending down (⚠️)
 * - High → Low = Critical trend (🚨)
 * - Medium → Low = Trending down (⚠️)
 * - Low → Medium = Trending up (✓)
 * - Low → High = Significant improvement (✓✓)
 */

import type { Wellness } from '../types/resident.types';

export type TrendDirection = 'down' | 'up' | 'stable';
export type TrendSeverity = 'critical' | 'warning' | 'improvement' | 'stable';

export interface WellnessTrend {
  direction: TrendDirection;
  severity: TrendSeverity;
  delta: number; // -2 (High→Low), -1 (High→Medium or Medium→Low), 0 (stable), +1, +2
  needsAttention: boolean;
  label: string;
  icon: string;
}

/**
 * Map wellness to numeric value for comparison
 */
const wellnessToNumber = (trend: 'Low' | 'Medium' | 'High'): number => {
  const map = { Low: 1, Medium: 2, High: 3 };
  return map[trend];
};

/**
 * Analyze wellness trend
 */
export function analyzeWellnessTrend(wellness: Wellness): WellnessTrend {
  const current = wellnessToNumber(wellness.trend);
  const previous = wellnessToNumber(wellness.previousTrend);
  const delta = current - previous;

  // Stable (no change)
  if (delta === 0) {
    return {
      direction: 'stable',
      severity: 'stable',
      delta: 0,
      needsAttention: wellness.trend === 'Low', // Low estable sigue siendo preocupante
      label: 'Stable',
      icon: '➡️',
    };
  }

  // Trending down (deterioro)
  if (delta < 0) {
    const isCritical = delta === -2; // High → Low (2 niveles)

    return {
      direction: 'down',
      severity: isCritical ? 'critical' : 'warning',
      delta,
      needsAttention: true,
      label: isCritical ? 'Critical Decline' : 'Trending Down',
      icon: isCritical ? '🚨' : '⚠️',
    };
  }

  // Trending up (mejora)
  const isSignificant = delta === 2; // Low → High (2 niveles)

  return {
    direction: 'up',
    severity: 'improvement',
    delta,
    needsAttention: false,
    label: isSignificant ? 'Significant Improvement' : 'Improving',
    icon: isSignificant ? '✅' : '📈',
  };
}

/**
 * Filter residents with concerning trends
 */
export function getResidentsWithTrendingIssues(
  residents: Array<{ id: number; wellness: Wellness; name: string }>
): Array<{ id: number; name: string; trend: WellnessTrend }> {
  return residents
    .map((r) => ({
      id: r.id,
      name: r.name,
      trend: analyzeWellnessTrend(r.wellness),
    }))
    .filter((r) => r.trend.needsAttention && r.trend.direction === 'down');
}

/**
 * Count residents by trend type
 */
export function countTrendingResidents(residents: Array<{ wellness: Wellness }>) {
  let trendingDown = 0;
  let trendingUp = 0;
  let stable = 0;
  let critical = 0;

  residents.forEach((r) => {
    const trend = analyzeWellnessTrend(r.wellness);

    if (trend.severity === 'critical') {
      critical++;
    } else if (trend.direction === 'down') {
      trendingDown++;
    } else if (trend.direction === 'up') {
      trendingUp++;
    } else {
      stable++;
    }
  });

  return { trendingDown, trendingUp, stable, critical };
}

/**
 * Get trend icon for UI
 */
export function getTrendIcon(trend: WellnessTrend): string {
  return trend.icon;
}

/**
 * Get trend color for UI
 */
export function getTrendColor(trend: WellnessTrend): string {
  const colorMap = {
    critical: '#B71C1C', // Dark red
    warning: '#FF9800', // Orange
    improvement: '#4CAF50', // Green
    stable: '#9E9E9E', // Gray
  };

  return colorMap[trend.severity];
}

/**
 * Format trend message for notifications
 */
export function formatTrendMessage(
  residentName: string,
  trend: WellnessTrend,
  wellness: Wellness
): string {
  const directionText = {
    down: `${wellness.previousTrend} → ${wellness.trend}`,
    up: `${wellness.previousTrend} → ${wellness.trend}`,
    stable: wellness.trend,
  };

  return `${residentName}: ${trend.label} (${directionText[trend.direction]})`;
}
