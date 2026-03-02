import { CSSProperties } from 'react';
import { theme } from '../../design-system';

interface SkeletonProps {
  /** Variant: text, circle, rect, card */
  variant?: 'text' | 'circle' | 'rect' | 'card';
  /** Width (px, %, or vw) */
  width?: string | number;
  /** Height (px, %, or vh) */
  height?: string | number;
  /** Border radius override */
  borderRadius?: string;
  /** Additional styles */
  style?: CSSProperties;
}

/**
 * Skeleton Loading Component
 *
 * Better perceived performance than spinners.
 * Shows structure before content loads.
 *
 * Usage:
 *   <Skeleton variant="text" width="80%" />
 *   <Skeleton variant="circle" width={40} height={40} />
 *   <Skeleton variant="card" height={120} />
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  borderRadius,
  style,
}: SkeletonProps) {
  const variantStyles: Record<string, CSSProperties> = {
    text: {
      height: '1em',
      borderRadius: theme.borderRadius.sm,
    },
    circle: {
      borderRadius: '50%',
    },
    rect: {
      borderRadius: theme.borderRadius.md,
    },
    card: {
      borderRadius: theme.borderRadius.lg,
    },
  };

  return (
    <div
      style={{
        ...styles.base,
        ...variantStyles[variant],
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: borderRadius || variantStyles[variant].borderRadius,
        ...style,
      }}
    />
  );
}

const styles: Record<string, CSSProperties> = {
  base: {
    backgroundColor: theme.colors.neutral[200],
    backgroundImage: `linear-gradient(
      90deg,
      ${theme.colors.neutral[200]} 0%,
      ${theme.colors.neutral[100]} 50%,
      ${theme.colors.neutral[200]} 100%
    )`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
};

// Shimmer animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(styleSheet);

/**
 * Skeleton Presets for Common Patterns
 */

/** Skeleton for RoomCard (collapsed) */
export function SkeletonRoomCard() {
  return (
    <div style={{ padding: theme.spacing.md, display: 'flex', gap: theme.spacing.md }}>
      <Skeleton variant="text" width={60} />
      <div style={{ flex: 1, display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
        <Skeleton variant="circle" width={24} height={24} />
        <Skeleton variant="circle" width={24} height={24} />
        <Skeleton variant="circle" width={24} height={24} />
      </div>
      <Skeleton variant="text" width={40} />
    </div>
  );
}

/** Skeleton for Favorite/Hot Resident Card */
export function SkeletonResidentCard() {
  return (
    <div
      style={{
        width: '88px',
        padding: theme.spacing.sm,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.xs,
      }}
    >
      <Skeleton variant="circle" width={42} height={42} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}

/** Skeleton for Resident Overview Screen */
export function SkeletonResidentOverview() {
  return (
    <div style={{ padding: theme.spacing.lg, display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <Skeleton variant="circle" width={64} height={64} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={24} style={{ marginBottom: theme.spacing.xs }} />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>

      {/* Wellness Card */}
      <Skeleton variant="card" height={180} />

      {/* Care Activities */}
      <Skeleton variant="card" height={220} />
    </div>
  );
}

/** Skeleton for Loading State */
export function SkeletonLoadingScreen({ count = 6 }: { count?: number }) {
  return (
    <div style={{ padding: theme.spacing.md }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRoomCard key={i} />
      ))}
    </div>
  );
}
