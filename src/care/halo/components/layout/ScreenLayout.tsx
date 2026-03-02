/**
 * Layout Component - ScreenLayout
 * Layout base reutilizable para todas las pantallas
 */

import { ReactNode } from "react";
import { theme, commonStyles } from "../../design-system";

interface ScreenLayoutProps {
  children: ReactNode;
  background?: string;
  padding?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export function ScreenLayout({
  children,
  background = theme.colors.background.secondary,
  padding,
  header,
  footer,
}: ScreenLayoutProps) {
  return (
    <div style={{
      ...commonStyles.screenContainer,
      background,
      display: "flex",
      flexDirection: "column",
    }}>
      {header && (
        <div style={{ flexShrink: 0 }}>
          {header}
        </div>
      )}

      <main style={{
        flex: 1,
        minHeight: 0,
        overflowX: "hidden",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: padding || 0,
      }}>
        {children}
      </main>

      {footer && (
        <div style={{ flexShrink: 0 }}>
          {footer}
        </div>
      )}
    </div>
  );
}
