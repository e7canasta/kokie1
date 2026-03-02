/**
 * Error Boundary - Captura errores de renderizado y muestra UI de fallo
 * Evita que un error en una pantalla derrumbe toda la app
 */

import { Component, type ErrorInfo, type ReactNode } from "react";
import { theme } from "../../design-system";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            fontFamily: theme.typography.fontFamily.primary,
            minHeight: "100vh",
            background: theme.colors.background.secondary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing.xl,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              maxWidth: 360,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
              }}
            >
              Something went wrong
            </p>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.lg,
              }}
            >
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.inverse,
                background: theme.colors.primary[500],
                border: "none",
                borderRadius: theme.borderRadius.full,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
