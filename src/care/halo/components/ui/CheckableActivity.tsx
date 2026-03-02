/**
 * CheckableActivity Component
 *
 * Sprint 3 (P2) - Tappable Care Activities
 * Interactive checkbox for care activity items
 */

import { useState } from "react";
import { theme } from "../../design-system/theme";
import type { TopCareItem } from "../../types/resident.types";

export interface CheckableActivityProps {
  item: TopCareItem;
  onToggle: (title: string, done: boolean) => void;
}

export function CheckableActivity({ item, onToggle }: CheckableActivityProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    onToggle(item.title, !item.done);
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "13px 0",
        cursor: "pointer",
        minHeight: 44, // Touch target minimum
        transform: isPressed ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Checkbox circle */}
      <div
        style={{
          width: 24,
          height: 24,
          minWidth: 24,
          borderRadius: "50%",
          border: `2px solid ${item.done ? theme.colors.success : theme.colors.neutral[300]}`,
          background: item.done ? theme.colors.success : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          marginTop: 2,
        }}
      >
        {item.done && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.text.inverse}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Activity content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold,
            color: item.done ? theme.colors.text.tertiary : theme.colors.text.primary,
            textDecoration: item.done ? "line-through" : "none",
            lineHeight: theme.typography.lineHeight.tight,
            transition: "all 0.2s ease",
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.normal,
            color: theme.colors.text.secondary,
            lineHeight: theme.typography.lineHeight.normal,
          }}
        >
          {item.description}
        </span>
      </div>
    </div>
  );
}
