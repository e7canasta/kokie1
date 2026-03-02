/**
 * RoomDetailScreen
 * Vista de habitación completa con todos los residentes
 * - CV Status badge (si aplica)
 * - Bulk confirm (solo si no tiene CV)
 * - Room-level notes
 */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResidents } from "../../hooks/useResidents";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { CVStatusBadge } from "../../components/ui/CVStatusBadge";
import { Avatar } from "../../components/ui/Avatar";
import { theme } from "../../design-system";
import type { CVStatus } from "../../types/resident.types";

const WELLNESS_DOT: Record<string, string> = {
  High: theme.colors.success,
  Medium: theme.colors.warning,
  Low: theme.colors.error,
};

const WELLNESS_LABEL: Record<string, string> = {
  High: "Stable",
  Medium: "Monitor",
  Low: "Attention",
};

export default function RoomDetailScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { roomGroups, isLoading, isError, error, refetch } = useResidents();
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [notePressed, setNotePressed] = useState(false);

  const roomGroup = roomGroups.find((g) => g.room === roomId);

  const handleBack = () => {
    navigate("/");
  };

  const handleResidentClick = (id: number) => {
    navigate(`/resident/${id}`);
  };

  const handleConfirmAll = () => {
    console.log("Confirm all visits for room", roomId);
    // TODO: Implementar confirmación bulk
  };

  const handleRoomNote = () => {
    console.log("Add room note for room", roomId);
    // TODO: Implementar notas a nivel de room
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState fullScreen message="Loading room..." />
      </ScreenLayout>
    );
  }

  if (isError || !roomGroup) {
    return (
      <ScreenLayout>
        <ErrorState
          fullScreen
          message={error?.message || "Room not found"}
          onRetry={() => refetch()}
        />
      </ScreenLayout>
    );
  }

  // Determinar CV status (mock - en producción vendría del backend)
  const cvStatus: CVStatus = roomGroup.cvStatus || "none";
  const hasCV = cvStatus === "active";

  return (
    <ScreenLayout background="#FFFFFF">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.text.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                lineHeight: 1.2,
              }}
            >
              Room {roomGroup.room}
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.text.tertiary,
              }}
            >
              {roomGroup.unit}
            </div>
          </div>
        </button>

        <CVStatusBadge status={cvStatus} lastDetected={roomGroup.lastCVDetection} />
      </div>

      {/* Residents list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {roomGroup.residents.map((resident) => {
            const wellnessTrend = resident.wellness?.trend ?? "Medium";
            const wellnessColor = WELLNESS_DOT[wellnessTrend] ?? theme.colors.neutral[400];
            const wellnessLabel = WELLNESS_LABEL[wellnessTrend] ?? "";

            return (
              <button
                key={resident.id}
                onClick={() => handleResidentClick(resident.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: theme.colors.background.primary,
                  border: `1px solid ${theme.colors.border.light}`,
                  borderLeft: `3px solid ${wellnessColor}`,
                  borderRadius: theme.borderRadius.sm,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.colors.neutral[50];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.colors.background.primary;
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar name={resident.name} size={42} colors={resident.colors ?? []} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -1,
                      right: -1,
                      width: 10,
                      height: 10,
                      borderRadius: theme.borderRadius.full,
                      background: wellnessColor,
                      border: `2px solid ${theme.colors.background.primary}`,
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {resident.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.medium,
                        color: theme.colors.text.tertiary,
                      }}
                    >
                      Bed {resident.bed}
                    </span>
                    <span style={{ color: theme.colors.text.tertiary }}>·</span>
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: wellnessTrend === "Low" ? wellnessColor : theme.colors.text.tertiary,
                      }}
                    >
                      {wellnessLabel}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme.colors.text.tertiary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 20px",
          background: theme.colors.background.primary,
          borderTop: `1px solid ${theme.colors.border.light}`,
          flexShrink: 0,
        }}
      >
        {/* Confirm All (solo si no tiene CV) */}
        {!hasCV && (
          <button
            onClick={handleConfirmAll}
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
              padding: "12px 16px",
              background: theme.colors.success,
              border: "none",
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text.inverse,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.bold,
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
            CONFIRM ALL
          </button>
        )}

        {/* Room Note */}
        <button
          onClick={handleRoomNote}
          onMouseDown={() => setNotePressed(true)}
          onMouseUp={() => setNotePressed(false)}
          onMouseLeave={() => setNotePressed(false)}
          onTouchStart={() => setNotePressed(true)}
          onTouchEnd={() => setNotePressed(false)}
          style={{
            flex: hasCV ? 1 : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px 16px",
            background: theme.colors.background.primary,
            border: `1.5px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.sm,
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.bold,
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
          ROOM NOTE
        </button>
      </div>
    </ScreenLayout>
  );
}
