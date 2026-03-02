/**
 * Component - QuickActionButton
 * Botón de acción rápida optimizado para mobile (una mano)
 */

import { ReactNode } from "react";
import { theme } from "../../design-system";

interface QuickActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function QuickActionButton({
  icon,
  label,
  onClick,
  variant = "primary",
  size = "md",
}: QuickActionButtonProps) {
  const sizeMap = {
    sm: { width: 44, height: 44, fontSize: 11 },
    md: { width: 56, height: 56, fontSize: 12 },
    lg: { width: 64, height: 64, fontSize: 13 },
  };

  const variantStyles = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
      color: theme.colors.text.inverse,
      boxShadow: `0 4px 12px ${theme.colors.primary[500]}40`,
    },
    secondary: {
      background: theme.colors.background.primary,
      color: theme.colors.primary[500],
      border: `2px solid ${theme.colors.primary[500]}`,
      boxShadow: theme.shadows.sm,
    },
    danger: {
      background: `linear-gradient(135deg, ${theme.colors.error}, #D32F2F)`,
      color: theme.colors.text.inverse,
      boxShadow: `0 4px 12px ${theme.colors.error}40`,
    },
  };

  const currentSize = sizeMap[size];
  const currentVariant = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      style={{
        ...currentVariant,
        width: currentSize.width,
        height: currentSize.height,
        borderRadius: theme.borderRadius.full,
        border: variant === "secondary" ? currentVariant.border : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: "pointer",
        fontSize: currentSize.fontSize,
        fontWeight: theme.typography.fontWeight.semibold,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: 0,
        position: "relative",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div style={{ fontSize: size === "lg" ? 24 : size === "md" ? 20 : 18 }}>
        {icon}
      </div>
      <span style={{ fontSize: currentSize.fontSize - 1 }}>{label}</span>
    </button>
  );
}
