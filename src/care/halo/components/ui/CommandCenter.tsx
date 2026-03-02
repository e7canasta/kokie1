/**
 * CommandCenter Component
 * Glance Score global - enfermera sabe el estado en < 1 segundo
 * Muestra: Alerts, Overdue, OK, CV Coverage, Next Room
 */

import { theme } from "../../design-system";
import type { CommandCenterProps } from "../../types/resident.types";

export function CommandCenter({
  alerts,
  overdue,
  ok,
  cvCoverage,
  nextRoom,
  onGoToNext,
}: CommandCenterProps) {
  const hasAlerts = alerts > 0;
  const hasOverdue = overdue > 0;

  return (
    <div
      style={{
        background: hasAlerts
          ? `${theme.colors.error}08`
          : theme.colors.background.secondary,
        borderBottom: `1px solid ${theme.colors.border.light}`,
        padding: "12px 18px",
      }}
    >
      {/* Status counts */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: nextRoom ? 8 : 0,
        }}
      >
        {/* Alerts */}
        {alerts > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>🔴</span>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.error,
              }}
            >
              {alerts}
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.text.secondary,
              }}
            >
              ALERT{alerts > 1 ? "S" : ""}
            </span>
          </div>
        )}

        {/* Overdue */}
        {overdue > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>⏱️</span>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.warning,
              }}
            >
              {overdue}
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.text.secondary,
              }}
            >
              OVERDUE
            </span>
          </div>
        )}

        {/* OK */}
        {ok > 0 && !hasAlerts && !hasOverdue && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>✅</span>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.success,
              }}
            >
              {ok}
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.text.secondary,
              }}
            >
              OK
            </span>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* CV Coverage */}
        {cvCoverage !== undefined && cvCoverage > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 11, lineHeight: 1 }}>📷</span>
            <span
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.primary[600],
              }}
            >
              {Math.round(cvCoverage * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Next room to visit */}
      {nextRoom && onGoToNext && (
        <div>
          <div
            style={{
              height: 1,
              background: theme.colors.border.light,
              margin: "8px 0",
            }}
          />
          <button
            onClick={onGoToNext}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "6px 8px",
              background: "transparent",
              border: `1px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.sm,
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.neutral[50];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.tertiary,
                }}
              >
                Next:
              </span>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Room {nextRoom.room}
              </span>
              {nextRoom.roundingStatus === "overdue" &&
                nextRoom.lastVisitedMinutesAgo && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.warning,
                    }}
                  >
                    (overdue {nextRoom.lastVisitedMinutesAgo}m)
                  </span>
                )}
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.colors.primary[500]}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
