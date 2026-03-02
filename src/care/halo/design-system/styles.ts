/**
 * Design System - Common Styles
 * Utilidades y estilos compartidos basados en el theme
 */

import { theme } from "./theme";

export const commonStyles = {
  // Layout utilities
  container: {
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    overflowX: "hidden" as const,
  },
  
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  // Card styles
  card: {
    background: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.light}`,
    padding: theme.spacing.lg,
  },
  
  cardElevated: {
    background: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.lg,
  },
  
  // Button base styles
  buttonBase: {
    border: "none",
    borderRadius: theme.borderRadius.full,
    cursor: "pointer",
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: theme.transitions.normal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  
  // Text styles
  textPrimary: {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  
  textSecondary: {
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  
  screenContainer: {
    fontFamily: theme.typography.fontFamily.primary,
    width: "100%",
    height: "100%",
    maxWidth: "100vw",
    background: theme.colors.background.secondary,
    overflow: "hidden",
    position: "relative" as const,
  },
  
  // Scrollable content
  scrollableContent: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch" as const,
  },
} as const;
