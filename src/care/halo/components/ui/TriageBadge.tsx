/**
 * TriageBadge Component
 *
 * Shows visual badge indicating why a resident is in the "Hot Residents" list
 * Part of Sprint 2 (P1) - Generative Hot Residents feature
 */

import type { Resident } from "../../types/resident.types";
import { theme } from "../../design-system/theme";

export interface TriageBadgeProps {
  reason: Resident["triageReason"];
  size?: "sm" | "md";
}

const TRIAGE_CONFIG = {
  alert: {
    label: "Alert",
    color: theme.colors.error, // #F44336 - Rojo
    bg: "#FFEBEE",
  },
  "next-in-round": {
    label: "Next",
    color: theme.colors.primary[500], // #2E7D6F - Teal
    bg: "#E8F5F3",
  },
  "recent-change": {
    label: "Changed",
    color: theme.colors.warning, // #FF9800 - Naranja
    bg: "#FFF3E0",
  },
  assigned: {
    label: "Assigned",
    color: theme.colors.neutral[500], // #9E9E9E - Gris
    bg: "#F5F5F5",
  },
} as const;

export function TriageBadge({ reason, size = "sm" }: TriageBadgeProps): JSX.Element | null {
  if (!reason) return null;

  const config = TRIAGE_CONFIG[reason];
  const isSmall = size === "sm";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isSmall ? "2px 6px" : "4px 8px",
        borderRadius: theme.borderRadius.sm,
        backgroundColor: config.bg,
        color: config.color,
        fontSize: isSmall ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: 1.2,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      }}
    >
      {config.label}
    </div>
  );
}
