/**
 * CVStatusBadge Component
 * Muestra el estado de Computer Vision para una room
 * Incentiva bottom-up adoption mostrando qué rooms tienen CV
 */

import { theme } from "../../design-system";
import type { CVStatusBadgeProps } from "../../types/resident.types";

const CV_CONFIG = {
  active: {
    color: theme.colors.success,
    bg: `${theme.colors.success}15`,
    icon: "📷",
    label: "CV Active",
  },
  offline: {
    color: theme.colors.neutral[500],
    bg: theme.colors.neutral[100],
    icon: "📷",
    label: "CV Offline",
  },
  none: {
    color: theme.colors.neutral[400],
    bg: "transparent",
    icon: "",
    label: "",
  },
};

export function CVStatusBadge({ status, lastDetected }: CVStatusBadgeProps) {
  const config = CV_CONFIG[status];

  // Si status es 'none', no renderizar nada
  if (status === "none") return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        background: config.bg,
        borderRadius: theme.borderRadius.sm,
        border: `1px solid ${config.color}30`,
      }}
    >
      <span style={{ fontSize: 10, lineHeight: 1 }}>{config.icon}</span>
      <span
        style={{
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.semibold,
          color: config.color,
        }}
      >
        {config.label}
      </span>
      {status === "active" && lastDetected !== undefined && (
        <span
          style={{
            fontSize: 10,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.tertiary,
          }}
        >
          · {lastDetected}m ago
        </span>
      )}
    </div>
  );
}
