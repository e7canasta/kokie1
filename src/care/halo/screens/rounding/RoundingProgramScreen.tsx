import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { theme } from "../../design-system";
import type { RoomGroup } from "../../types/resident.types";

interface ProgrammedRoom {
  roomId: string;
  roomNumber: string;
  severity: "alert" | "monitor" | "clear";
  priority: number;
  reason: string;
  residents: { name: string; issue?: string }[];
  isVirtualEligible: boolean;
}

interface RoundingProgramScreenProps {
  roundType?: string;
  scheduledTime?: string;
  roomsProgram: ProgrammedRoom[];
  onStart: () => void;
}

const SeverityIcon = ({ severity }: { severity: "alert" | "monitor" | "clear" }) => {
  const color =
    severity === "alert"
      ? theme.colors.error
      : severity === "monitor"
        ? theme.colors.warning
        : theme.colors.neutral[400];

  if (severity === "alert") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    );
  }

  if (severity === "monitor") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>
  );
};

export default function RoundingProgramScreen({
  roundType = "General",
  scheduledTime = "14:00",
  roomsProgram,
  onStart,
}: RoundingProgramScreenProps) {
  const navigate = useNavigate();
  const [startPressed, setStartPressed] = useState(false);

  const virtualEligibleCount = roomsProgram.filter((r) => r.isVirtualEligible).length;
  const estimatedTimeSaved = virtualEligibleCount * 4; // ~4 min ahorrados por room virtual

  return (
    <ScreenLayout background={theme.colors.background.secondary}>
      {/* Header */}
      <div
        style={{
          padding: `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`,
          background: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: theme.colors.primary[600],
            fontSize: theme.typography.fontSize.lg,
            cursor: "pointer",
            padding: 0,
            marginBottom: theme.spacing.sm,
          }}
        >
          ← Volver
        </button>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            Programa de Ronda
          </h1>
          <p
            style={{
              margin: `${theme.spacing.xs} 0 0`,
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.text.secondary,
            }}
          >
            {roundType} • {scheduledTime} • {roomsProgram.length} habitaciones
          </p>
        </div>
      </div>

      {/* Virtual eligible banner */}
      {virtualEligibleCount > 0 && (
        <div
          style={{
            padding: theme.spacing.md,
            margin: theme.spacing.md,
            background: `${theme.colors.primary[500]}10`,
            border: `1px solid ${theme.colors.primary[300]}`,
            borderRadius: theme.borderRadius.md,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.primary,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary[600]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span>
              <strong>{virtualEligibleCount}</strong> habitacion{virtualEligibleCount > 1 ? "es" : ""} pueden ser virtuales
            </span>
          </div>
          <p
            style={{
              margin: `${theme.spacing.xs} 0 0`,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.text.tertiary,
            }}
          >
            (ahorro estimado: ~{estimatedTimeSaved} min)
          </p>
        </div>
      )}

      {/* Subtitle */}
      <div
        style={{
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.secondary,
          textTransform: "uppercase",
          letterSpacing: theme.typography.letterSpacing.wide,
        }}
      >
        ORDEN SUGERIDO (optimizado por prioridad):
      </div>

      {/* Rooms list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: `0 ${theme.spacing.lg} ${theme.spacing.xl}`,
        }}
      >
        {roomsProgram.map((room, index) => (
          <div
            key={room.roomId}
            style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              background: theme.colors.background.primary,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: theme.borderRadius.md,
              display: "flex",
              gap: theme.spacing.md,
            }}
          >
            {/* Index number */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: room.severity === "alert" ? theme.colors.error : theme.colors.neutral[200],
                color: room.severity === "alert" ? theme.colors.text.inverse : theme.colors.text.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.bold,
                flexShrink: 0,
              }}
            >
              {index + 1}
            </div>

            {/* Room info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: theme.spacing.xs,
                }}
              >
                <SeverityIcon severity={room.severity} />
                <span
                  style={{
                    fontSize: theme.typography.fontSize.md,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Habitación {room.roomNumber}
                </span>

                {room.isVirtualEligible && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.primary[600],
                      background: `${theme.colors.primary[100]}`,
                      padding: "2px 6px",
                      borderRadius: theme.borderRadius.sm,
                      letterSpacing: "0.03em",
                    }}
                  >
                    VIRTUAL POSIBLE
                  </span>
                )}
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                {room.reason}
              </p>

              {/* Residents list */}
              {room.residents.length > 0 && (
                <div
                  style={{
                    marginTop: theme.spacing.xs,
                    paddingLeft: theme.spacing.md,
                  }}
                >
                  {room.residents.map((resident, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.text.tertiary,
                      }}
                    >
                      └ {resident.name}
                      {resident.issue && <span style={{ color: theme.colors.warning }}> - {resident.issue}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div
        style={{
          padding: theme.spacing.lg,
          background: theme.colors.background.primary,
          borderTop: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <button
          onClick={onStart}
          onMouseDown={() => setStartPressed(true)}
          onMouseUp={() => setStartPressed(false)}
          onMouseLeave={() => setStartPressed(false)}
          onTouchStart={() => setStartPressed(true)}
          onTouchEnd={() => setStartPressed(false)}
          style={{
            width: "100%",
            padding: theme.spacing.lg,
            background: "linear-gradient(135deg, #FF6B35, #E84E1B)",
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
            transform: startPressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s ease",
            boxShadow: "0 6px 20px rgba(232, 78, 27, 0.35)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          INICIAR RONDA
        </button>
      </div>
    </ScreenLayout>
  );
}
