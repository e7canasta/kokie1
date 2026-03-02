import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { theme } from "../../design-system";

export interface RoundingSummary {
  roundType: string;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  durationMinutes: number;
  completed: string[]; // room IDs
  virtual: string[]; // room IDs visitadas virtualmente
  pending: { roomId: string; roomNumber: string; reason: string }[];
  notesAdded: number;
  stats: {
    avgTimePerRoom: number; // minutos
    virtualTimeSaved: number; // minutos
    activitiesVerified: { completed: number; total: number };
  };
}

interface RoundingSummaryScreenProps {
  summary: RoundingSummary;
  onAddShiftNote?: () => void;
  onFinish: () => void;
}

export default function RoundingSummaryScreen({
  summary,
  onAddShiftNote,
  onFinish,
}: RoundingSummaryScreenProps) {
  const navigate = useNavigate();
  const [addNotePressed, setAddNotePressed] = useState(false);
  const [finishPressed, setFinishPressed] = useState(false);

  const verificationPercentage = Math.round(
    (summary.stats.activitiesVerified.completed / summary.stats.activitiesVerified.total) * 100
  );

  return (
    <ScreenLayout background={theme.colors.background.secondary}>
      {/* Header */}
      <div
        style={{
          padding: theme.spacing.lg,
          background: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: theme.spacing.sm,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.success}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h1
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            Resumen de Ronda
          </h1>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.text.secondary,
          }}
        >
          {summary.roundType} • {summary.startTime} - {summary.endTime} ({summary.durationMinutes} min)
        </p>
      </div>

      {/* Summary cards */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: theme.spacing.lg,
          paddingBottom: theme.spacing["3xl"],
        }}
      >
        {/* Completed */}
        <div
          style={{
            marginBottom: theme.spacing.md,
            padding: theme.spacing.lg,
            background: theme.colors.background.primary,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border.light}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: theme.spacing.sm,
            }}
          >
            <svg
              width="20"
              height="20"
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
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
              }}
            >
              COMPLETADAS: {summary.completed.length}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
            }}
          >
            {summary.completed.join(", ")}
          </p>
        </div>

        {/* Virtual */}
        {summary.virtual.length > 0 && (
          <div
            style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.lg,
              background: `${theme.colors.primary[500]}08`,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.primary[300]}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: theme.spacing.sm,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span
                style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                VIRTUALES: {summary.virtual.length}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              {summary.virtual.join(", ")} (ahorraste ~{summary.stats.virtualTimeSaved} min)
            </p>
          </div>
        )}

        {/* Pending */}
        {summary.pending.length > 0 && (
          <div
            style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.lg,
              background: `${theme.colors.warning}08`,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.warning}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: theme.spacing.sm,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={theme.colors.warning} stroke="none">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <span
                style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                PENDIENTES: {summary.pending.length}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
              {summary.pending.map((pending) => (
                <div
                  key={pending.roomId}
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  • Habitación {pending.roomNumber}: {pending.reason}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {summary.notesAdded > 0 && (
          <div
            style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.lg,
              background: theme.colors.background.primary,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border.light}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.colors.text.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span
                style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                NOTAS AGREGADAS: {summary.notesAdded}
              </span>
            </div>
          </div>
        )}

        {/* Stats */}
        <div
          style={{
            padding: theme.spacing.lg,
            background: theme.colors.background.primary,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border.light}`,
          }}
        >
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.md,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wide,
            }}
          >
            ESTADÍSTICAS DE RONDA:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.primary,
              }}
            >
              <span>Tiempo promedio por habitación:</span>
              <strong>{summary.stats.avgTimePerRoom} min</strong>
            </div>
            {summary.virtual.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.primary,
                }}
              >
                <span>Tiempo ahorrado (virtual):</span>
                <strong style={{ color: theme.colors.primary[600] }}>
                  {summary.stats.virtualTimeSaved} min
                </strong>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.primary,
              }}
            >
              <span>Actividades verificadas:</span>
              <strong>
                {summary.stats.activitiesVerified.completed}/{summary.stats.activitiesVerified.total} ({verificationPercentage}%)
              </strong>
            </div>
          </div>
        </div>

        {/* Shift note prompt */}
        {summary.pending.length > 0 && onAddShiftNote && (
          <div
            style={{
              marginTop: theme.spacing.lg,
              padding: theme.spacing.lg,
              background: theme.colors.background.primary,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border.light}`,
            }}
          >
            <p
              style={{
                margin: `0 0 ${theme.spacing.md}`,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.primary,
              }}
            >
              ¿Agregar nota de turno para pendientes?
            </p>
            <button
              onClick={onAddShiftNote}
              onMouseDown={() => setAddNotePressed(true)}
              onMouseUp={() => setAddNotePressed(false)}
              onMouseLeave={() => setAddNotePressed(false)}
              onTouchStart={() => setAddNotePressed(true)}
              onTouchEnd={() => setAddNotePressed(false)}
              style={{
                width: "100%",
                padding: theme.spacing.md,
                background: theme.colors.background.secondary,
                border: `1.5px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                cursor: "pointer",
                transform: addNotePressed ? "scale(0.97)" : "scale(1)",
                transition: "transform 0.15s ease",
              }}
            >
              AGREGAR NOTA
            </button>
          </div>
        )}
      </div>

      {/* Finish button */}
      <div
        style={{
          padding: theme.spacing.lg,
          background: theme.colors.background.primary,
          borderTop: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <button
          onClick={onFinish}
          onMouseDown={() => setFinishPressed(true)}
          onMouseUp={() => setFinishPressed(false)}
          onMouseLeave={() => setFinishPressed(false)}
          onTouchStart={() => setFinishPressed(true)}
          onTouchEnd={() => setFinishPressed(false)}
          style={{
            width: "100%",
            padding: theme.spacing.lg,
            background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[700]})`,
            border: "none",
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.inverse,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: finishPressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
            boxShadow: theme.shadows.md,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          FINALIZAR RONDA ✓
        </button>
      </div>
    </ScreenLayout>
  );
}
