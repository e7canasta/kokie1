/**
 * QuickActionBar Component
 * Dual-mode actions bar para Resident Detail
 * - Con CV: Muestra detección automática + Note + Escalate
 * - Sin CV: Muestra Confirm Visit + Note + Escalate
 *
 * Incentiva bottom-up CV adoption mostrando la diferencia
 */

import { useState } from "react";
import { theme } from "../../design-system";
import type { QuickActionBarProps } from "../../types/resident.types";

export function QuickActionBar({
  hasCV = false,
  lastDetected,
  onConfirmVisit,
  onNote,
  onEscalate,
}: QuickActionBarProps) {
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [notePressed, setNotePressed] = useState(false);
  const [escalatePressed, setEscalatePressed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 20px",
        background: theme.colors.background.primary,
        borderTop: `1px solid ${theme.colors.border.light}`,
        flexShrink: 0,
      }}
    >
      {/* Con CV: Mostrar status de detección (solo lectura) */}
      {hasCV && lastDetected !== undefined ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 12px",
            background: `${theme.colors.success}10`,
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.success}30`,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.success}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.success,
            }}
          >
            Detected
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.tertiary,
            }}
          >
            {lastDetected}m ago
          </span>
        </div>
      ) : (
        // Sin CV: Mostrar botón de Confirm Visit
        !hasCV &&
        onConfirmVisit && (
          <button
            onClick={onConfirmVisit}
            onMouseDown={() => setConfirmPressed(true)}
            onMouseUp={() => setConfirmPressed(false)}
            onMouseLeave={() => setConfirmPressed(false)}
            onTouchStart={() => setConfirmPressed(true)}
            onTouchEnd={() => setConfirmPressed(false)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 12px",
              background: theme.colors.success,
              border: "none",
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text.inverse,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              cursor: "pointer",
              transform: confirmPressed ? "scale(0.97)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            CONFIRM
          </button>
        )
      )}

      {/* Note button */}
      <button
        onClick={onNote}
        onMouseDown={() => setNotePressed(true)}
        onMouseUp={() => setNotePressed(false)}
        onMouseLeave={() => setNotePressed(false)}
        onTouchStart={() => setNotePressed(true)}
        onTouchEnd={() => setNotePressed(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "10px 16px",
          background: theme.colors.background.primary,
          border: `1.5px solid ${theme.colors.border.medium}`,
          borderRadius: theme.borderRadius.sm,
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          cursor: "pointer",
          transform: notePressed ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.15s ease",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        NOTE
      </button>

      {/* Escalate button */}
      <button
        onClick={onEscalate}
        onMouseDown={() => setEscalatePressed(true)}
        onMouseUp={() => setEscalatePressed(false)}
        onMouseLeave={() => setEscalatePressed(false)}
        onTouchStart={() => setEscalatePressed(true)}
        onTouchEnd={() => setEscalatePressed(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "10px 16px",
          background: theme.colors.background.primary,
          border: `1.5px solid ${theme.colors.error}`,
          borderRadius: theme.borderRadius.sm,
          color: theme.colors.error,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          cursor: "pointer",
          transform: escalatePressed ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.15s ease",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        ALERT
      </button>
    </div>
  );
}
