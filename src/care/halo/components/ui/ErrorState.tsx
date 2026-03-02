/**
 * UI Component - ErrorState
 * Estado de error reutilizable
 */

import { theme } from "../../design-system";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
  fullScreen = false,
}: ErrorStateProps) {
  const containerStyle = fullScreen
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.background.primary,
        padding: theme.spacing.xl,
        zIndex: theme.zIndex.modal,
      }
    : {
        padding: theme.spacing.xl,
        textAlign: "center" as const,
      };

  return (
    <div style={containerStyle}>
      <div style={{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.error,
        marginBottom: onRetry ? theme.spacing.md : 0,
      }}>
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: theme.spacing.md,
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            background: theme.colors.primary[500],
            color: theme.colors.text.inverse,
            border: "none",
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
