/**
 * Component - PriorityBadge
 * Badge visual para indicar prioridad/urgencia
 */

import { theme } from "../../design-system";

type Priority = "low" | "medium" | "high" | "critical";

interface PriorityBadgeProps {
  priority: Priority;
  pulse?: boolean;
}

export function PriorityBadge({ priority, pulse = false }: PriorityBadgeProps) {
  const config = {
    low: {
      color: theme.colors.success,
      label: "Normal",
      size: 6,
    },
    medium: {
      color: theme.colors.warning,
      label: "Attention",
      size: 8,
    },
    high: {
      color: theme.colors.error,
      label: "Urgent",
      size: 10,
    },
    critical: {
      color: theme.colors.error,
      label: "Critical",
      size: 12,
    },
  };

  const { color, label, size } = config[priority];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 8px",
        background: `${color}15`,
        borderRadius: theme.borderRadius.full,
        border: `1px solid ${color}40`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 ${size * 2}px ${color}60`,
          animation: pulse ? "pulse 2s infinite" : "none",
        }}
      />
      <span
        style={{
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.semibold,
          color: color,
        }}
      >
        {label}
      </span>
    </div>
  );
}
