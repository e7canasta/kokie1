import { useState } from "react";
import { theme } from "../../design-system";

export interface VirtualVisitInfo {
  roomId: string;
  roomNumber: string;
  residents: {
    name: string;
    status: string; // ej: "Durmiendo", "Estable", "Movimiento normal"
  }[];
  lastUpdate: string; // ej: "hace 3 min"
  ambientStatus: {
    movement: string; // ej: "Normal", "Sin movimiento anómalo"
    alerts: string[]; // ej: []
  };
  hasCameraFeed: boolean;
}

interface VirtualVisitSheetProps {
  visitInfo: VirtualVisitInfo;
  onConfirmVirtual?: () => void;
  onNeedPhysical?: () => void;
  onViewCamera?: () => void;
}

export function VirtualVisitSheet({
  visitInfo,
  onConfirmVirtual,
  onNeedPhysical,
  onViewCamera,
}: VirtualVisitSheetProps) {
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [physicalPressed, setPhysicalPressed] = useState(false);

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
            stroke={theme.colors.primary[600]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            Visita Virtual - Habitación {visitInfo.roomNumber}
          </span>
        </div>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
          }}
        >
          Monitoreo ambiental activo
        </span>
      </div>

      {/* Camera placeholder or feed */}
      {visitInfo.hasCameraFeed && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: theme.colors.neutral[900],
            borderRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Placeholder image or live feed aquí */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: theme.colors.neutral[400],
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span style={{ fontSize: theme.typography.fontSize.sm }}>
              Vista de habitación
            </span>
          </div>

          {/* View Camera button overlay */}
          {onViewCamera && (
            <button
              onClick={onViewCamera}
              style={{
                position: "absolute",
                bottom: theme.spacing.md,
                right: theme.spacing.md,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${theme.colors.neutral[600]}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.inverse,
                cursor: "pointer",
              }}
            >
              👁 VER EN VIVO
            </button>
          )}
        </div>
      )}

      {/* Ambient Status */}
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
          ESTADO AMBIENTAL ({visitInfo.lastUpdate}):
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.sm,
          }}
        >
          {/* Residents status */}
          {visitInfo.residents.map((resident, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.sm,
                padding: theme.spacing.sm,
                background: theme.colors.background.secondary,
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.primary,
                }}
              >
                {resident.name}: <strong>{resident.status}</strong>
              </span>
            </div>
          ))}

          {/* Movement */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.sm,
              padding: theme.spacing.sm,
              background: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.sm,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.colors.success}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v6m6.4-1.6l-4.2 4.2m6.4 2.4h-6m1.6 6.4l-4.2-4.2m2.4 6.4v-6m-6.4 1.6l4.2-4.2m-6.4-2.4h6m-1.6-6.4l4.2 4.2" />
            </svg>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.primary,
              }}
            >
              Movimiento: <strong>{visitInfo.ambientStatus.movement}</strong>
            </span>
          </div>

          {/* Alerts */}
          {visitInfo.ambientStatus.alerts.length === 0 ? (
            <div
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
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.primary,
                }}
              >
                Alertas: <strong>Ninguna</strong>
              </span>
            </div>
          ) : (
            visitInfo.ambientStatus.alerts.map((alert, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                  padding: theme.spacing.sm,
                  background: `${theme.colors.warning}08`,
                  border: `1px solid ${theme.colors.warning}`,
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={theme.colors.warning}
                  stroke="none"
                >
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.primary,
                  }}
                >
                  {alert}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation prompt */}
      <div
        style={{
          padding: theme.spacing.md,
          background: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.md,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.primary,
            textAlign: "center",
          }}
        >
          ¿Confirmas visita virtual?
        </p>
        <p
          style={{
            margin: `${theme.spacing.xs} 0 0`,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.tertiary,
            textAlign: "center",
          }}
        >
          No necesitas ir físicamente a la habitación
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.md }}>
        {onNeedPhysical && (
          <button
            onClick={onNeedPhysical}
            onMouseDown={() => setPhysicalPressed(true)}
            onMouseUp={() => setPhysicalPressed(false)}
            onMouseLeave={() => setPhysicalPressed(false)}
            onTouchStart={() => setPhysicalPressed(true)}
            onTouchEnd={() => setPhysicalPressed(false)}
            style={{
              padding: theme.spacing.md,
              background: theme.colors.background.secondary,
              border: `1.5px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              cursor: "pointer",
              transform: physicalPressed ? "scale(0.97)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            NECESITO IR FÍSICAMENTE
          </button>
        )}

        {onConfirmVirtual && (
          <button
            onClick={onConfirmVirtual}
            onMouseDown={() => setConfirmPressed(true)}
            onMouseUp={() => setConfirmPressed(false)}
            onMouseLeave={() => setConfirmPressed(false)}
            onTouchStart={() => setConfirmPressed(true)}
            onTouchEnd={() => setConfirmPressed(false)}
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
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transform: confirmPressed ? "scale(0.97)" : "scale(1)",
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
            CONFIRMAR VIRTUAL
          </button>
        )}
      </div>
    </div>
  );
}
