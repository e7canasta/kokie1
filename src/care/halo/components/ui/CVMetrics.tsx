/**
 * CVMetrics Component
 *
 * Sprint 2 (P0) - CV Metrics Dashboard
 * Shows Computer Vision adoption metrics to incentivize bottom-up adoption
 *
 * Bottom-up incentive strategy:
 * - Muestra ahorro de tiempo tangible
 * - Mensaje motivacional según cobertura
 * - La enfermera ve el valor de CV → pide más cámaras
 */

import { theme } from "../../design-system/theme";
import { calculateCVCoverage, getCVMotivationalMessage } from "../../utils/cvDetection";

export interface CVMetricsProps {
  roomsWithCV: number;
  totalRooms: number;
  confirmationsSaved?: number; // Confirmaciones ahorradas hoy
}

export function CVMetrics({ roomsWithCV, totalRooms, confirmationsSaved = 0 }: CVMetricsProps): JSX.Element {
  const cvPercentage = calculateCVCoverage(roomsWithCV, totalRooms);
  const timeSavedMinutes = confirmationsSaved > 0 ? Math.ceil(confirmationsSaved * 0.5) : 0;
  const motivationalMessage = getCVMotivationalMessage(cvPercentage);

  if (confirmationsSaved === 0 && roomsWithCV === 0) return <></>;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #E8F5F3 0%, #F0F9F7 100%)",
        border: `1px solid ${theme.colors.primary[200]}`,
        borderRadius: theme.borderRadius.md,
        padding: "16px 18px",
        margin: "0 18px 12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={theme.colors.primary[500]} stroke="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          <circle cx="12" cy="9" r="1.5" fill={theme.colors.background.primary} />
        </svg>
        <span
          style={{
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary[700],
          }}
        >
          CV te ahorró hoy:
        </span>
      </div>

      {/* Savings */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary[600],
            lineHeight: 1,
          }}
        >
          {confirmationsSaved}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.secondary,
          }}
        >
          confirmaciones
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.tertiary,
          }}
        >
          · ~{timeSavedMinutes} min
        </span>
      </div>

      {/* Coverage */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
          borderTop: `1px solid ${theme.colors.primary[200]}`,
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.secondary,
          }}
        >
          Rooms con CV:
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[600],
            }}
          >
            {roomsWithCV}/{totalRooms}
          </span>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.tertiary,
            }}
          >
            ({cvPercentage}%)
          </span>
        </div>
      </div>

      {/* Motivational Message */}
      <div
        style={{
          marginTop: theme.spacing.sm,
          padding: theme.spacing.sm,
          background: `${theme.colors.primary[500]}10`,
          borderRadius: theme.borderRadius.sm,
          borderLeft: `3px solid ${theme.colors.primary[500]}`,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.primary[700],
            fontStyle: 'italic',
          }}
        >
          💡 {motivationalMessage}
        </p>
      </div>
    </div>
  );
}
