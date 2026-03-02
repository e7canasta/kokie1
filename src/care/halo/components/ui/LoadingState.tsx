/**
 * UI Component - LoadingState
 * Estado de carga reutilizable
 */

import { theme } from "../../design-system";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({
  message = "Loading...",
  fullScreen = false,
}: LoadingStateProps) {
  const containerStyle = fullScreen
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.background.primary,
        zIndex: theme.zIndex.modal,
      }
    : {
        padding: theme.spacing.xl,
        textAlign: "center" as const,
      };

  return (
    <div style={containerStyle}>
      <div style={{
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text.secondary,
      }}>
        {message}
      </div>
    </div>
  );
}
