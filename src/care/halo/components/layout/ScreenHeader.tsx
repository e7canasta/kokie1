/**
 * Layout Component - ScreenHeader
 * Header reutilizable para pantallas con botón de volver
 */

import { ReactNode } from "react";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { theme } from "../../design-system";

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightAction?: ReactNode;
  subtitle?: string;
}

export function ScreenHeader({
  title,
  onBack,
  rightAction,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <div style={{
      background: theme.colors.background.primary,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      borderBottom: `1px solid ${theme.colors.border.light}`,
      display: "flex",
      alignItems: "center",
      gap: theme.spacing.md,
      flexShrink: 0,
    }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: theme.spacing.xs,
          color: theme.colors.text.primary,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
        aria-label="Go back"
      >
        <ChevronLeftIcon />
      </button>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{
          fontSize: theme.typography.fontSize["2xl"],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          margin: 0,
          lineHeight: theme.typography.lineHeight.tight,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            margin: `${theme.spacing.xs} 0 0 0`,
          }}>
            {subtitle}
          </p>
        )}
      </div>
      
      {rightAction && (
        <div style={{ flexShrink: 0 }}>
          {rightAction}
        </div>
      )}
    </div>
  );
}
