import { useState } from "react";
import { theme } from "../../design-system";

export interface DetectedActivity {
  id: string;
  label: string;
  detected: boolean;
  timestamp?: string; // "HH:MM"
}

export interface ScheduledActivity {
  id: string;
  label: string;
  completed: boolean;
  matchedWithDetection: boolean;
}

export interface RoomVisitSummary {
  roomId: string;
  roomNumber: string;
  durationMinutes: number;
  detected: DetectedActivity[];
  scheduled: ScheduledActivity[];
  nextRoom?: {
    roomNumber: string;
    isVirtual: boolean;
  };
}

interface PostRoomSummarySheetProps {
  summary: RoomVisitSummary;
  onAddNote?: () => void;
  onMarkCompleted?: (activityId: string) => void;
  onCompleteAndNext?: () => void;
  onCancel?: () => void;
}

export function PostRoomSummarySheet({
  summary,
  onAddNote,
  onMarkCompleted,
  onCompleteAndNext,
  onCancel,
}: PostRoomSummarySheetProps) {
  const [addNotePressed, setAddNotePressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);

  const uncompletedScheduled = summary.scheduled.filter((a) => !a.completed);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.lg,
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <svg
            width="18"
            height="18"
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
          <span
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            Habitación {summary.roomNumber} Completada
          </span>
        </div>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
          }}
        >
          Tiempo: {summary.durationMinutes} min
        </span>
      </div>

      {/* Detected Activities Section */}
      {summary.detected.length > 0 && (
        <div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.sm,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wide,
            }}
          >
            DETECTADO AUTOMÁTICAMENTE:
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.sm,
            }}
          >
            {summary.detected.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                  padding: theme.spacing.sm,
                  background: `${theme.colors.success}08`,
                  borderRadius: theme.borderRadius.sm,
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
                    flex: 1,
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.primary,
                  }}
                >
                  {activity.label}
                </span>
                {activity.timestamp && (
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {activity.timestamp}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Activities Section */}
      {summary.scheduled.length > 0 && (
        <div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.sm,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wide,
            }}
          >
            PROGRAMADO PARA ESTA RONDA:
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.sm,
            }}
          >
            {summary.scheduled.map((activity) => {
              const isCompleted = activity.completed || activity.matchedWithDetection;

              return (
                <div
                  key={activity.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    background: isCompleted
                      ? `${theme.colors.success}08`
                      : `${theme.colors.warning}08`,
                    border: `1px solid ${isCompleted ? theme.colors.success : theme.colors.warning}`,
                    borderRadius: theme.borderRadius.sm,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isCompleted ? theme.colors.success : theme.colors.warning}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {isCompleted ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  <span
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {activity.label}
                    {activity.matchedWithDetection && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.success,
                          fontWeight: theme.typography.fontWeight.medium,
                        }}
                      >
                        ← Coincide con detección
                      </span>
                    )}
                  </span>

                  {!isCompleted && onMarkCompleted && (
                    <button
                      onClick={() => onMarkCompleted(activity.id)}
                      style={{
                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                        background: theme.colors.primary[500],
                        border: "none",
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.text.inverse,
                        cursor: "pointer",
                      }}
                    >
                      MARCAR
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Warning for uncompleted scheduled activities */}
      {uncompletedScheduled.length > 0 && (
        <div
          style={{
            padding: theme.spacing.md,
            background: `${theme.colors.warning}10`,
            border: `1px solid ${theme.colors.warning}`,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.primary,
            }}
          >
            ⚠️ {uncompletedScheduled.length} actividad
            {uncompletedScheduled.length > 1 ? "es" : ""} pendiente
            {uncompletedScheduled.length > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Add Note Button */}
      {onAddNote && (
        <button
          onClick={onAddNote}
          onMouseDown={() => setAddNotePressed(true)}
          onMouseUp={() => setAddNotePressed(false)}
          onMouseLeave={() => setAddNotePressed(false)}
          onTouchStart={() => setAddNotePressed(true)}
          onTouchEnd={() => setAddNotePressed(false)}
          style={{
            padding: theme.spacing.md,
            background: theme.colors.background.secondary,
            border: `1.5px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transform: addNotePressed ? "scale(0.97)" : "scale(1)",
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
          AGREGAR NOTA
        </button>
      )}

      {/* Complete and Next Button */}
      {onCompleteAndNext && (
        <button
          onClick={onCompleteAndNext}
          onMouseDown={() => setNextPressed(true)}
          onMouseUp={() => setNextPressed(false)}
          onMouseLeave={() => setNextPressed(false)}
          onTouchStart={() => setNextPressed(true)}
          onTouchEnd={() => setNextPressed(false)}
          style={{
            padding: theme.spacing.lg,
            background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[700]})`,
            border: "none",
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.inverse,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            transform: nextPressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
            boxShadow: theme.shadows.md,
          }}
        >
          <span>COMPLETAR Y SIGUIENTE</span>
          {summary.nextRoom && (
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                opacity: 0.9,
              }}
            >
              Habitación {summary.nextRoom.roomNumber}
              {summary.nextRoom.isVirtual && " (Virtual posible)"}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
