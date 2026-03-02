import { useState } from "react";
import { theme } from "../../design-system";
import { Avatar } from "../ui/Avatar";
import type { Resident, RoomGroup } from "../../types/resident.types";

type RoomSeverity = "alert" | "monitor" | "clear";

const SEVERITY_ACCENT: Record<RoomSeverity, string> = {
  alert: theme.colors.error,
  monitor: theme.colors.warning,
  clear: theme.colors.success,
};

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

function getRoomSeverity(residents: Resident[]): RoomSeverity {
  if (residents.some((r) => r.wellness?.trend === "Low")) return "alert";
  if (residents.some((r) => r.wellness?.trend === "Medium")) return "monitor";
  return "clear";
}

interface RoomCardProps {
  group: RoomGroup;
  onResidentClick: (id: number) => void;
}

export function RoomCard({ group, onResidentClick }: RoomCardProps) {
  const severity = getRoomSeverity(group.residents);
  const hasAlert = severity === "alert";
  const [expanded, setExpanded] = useState(hasAlert);
  const lowCount = group.residents.filter((r) => r.wellness?.trend === "Low").length;
  const isVisited = group.roundingStatus === "visited";
  const isOverdue = group.roundingStatus === "overdue";
  const accentColor = SEVERITY_ACCENT[severity];

  return (
    <div
      style={{
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.sm,
        border: `1px solid ${theme.colors.border.light}`,
        borderLeft: `3.5px solid ${accentColor}`,
        overflow: "hidden",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Tappable header -- always visible */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 10px 9px 12px",
          cursor: "pointer",
          background: hasAlert ? `${theme.colors.error}06` : "transparent",
          transition: "background 0.2s ease",
        }}
      >
        {/* Room number */}
        <span
          style={{
            fontSize: 13,
            fontWeight: theme.typography.fontWeight.bold,
            color: hasAlert ? theme.colors.error : theme.colors.primary[700],
            whiteSpace: "nowrap",
            minWidth: 32,
          }}
        >
          {group.room}
        </span>

        {/* Stacked mini avatars */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {group.residents.map((r, i) => (
            <div
              key={r.id}
              style={{
                marginLeft: i > 0 ? -7 : 0,
                zIndex: group.residents.length - i,
                position: "relative",
                borderRadius: "50%",
                border: `1.5px solid ${theme.colors.background.primary}`,
              }}
            >
              <Avatar name={r.name} size={20} colors={r.colors ?? []} />
            </div>
          ))}
        </div>

        {/* Wellness dots */}
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          {group.residents.map((r) => {
            const trend = r.wellness?.trend ?? "Medium";
            const color = WELLNESS_DOT[trend] ?? theme.colors.neutral[400];
            return (
              <div
                key={r.id}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: trend === "Low" ? `0 0 5px ${color}90` : "none",
                  animation: trend === "Low" ? "dotPulse 2s ease-in-out infinite" : "none",
                }}
              />
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* Status indicators */}
        {lowCount > 0 && (
          <span
            style={{
              fontSize: 10,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.inverse,
              background: theme.colors.error,
              borderRadius: theme.borderRadius.full,
              padding: "1px 6px",
              lineHeight: "1.5",
            }}
          >
            {lowCount}
          </span>
        )}

        {isOverdue && lowCount === 0 && (
          <span
            style={{
              fontSize: 9,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.warning,
              letterSpacing: "0.03em",
            }}
          >
            OVERDUE
          </span>
        )}

        {isVisited && lowCount === 0 && (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.success}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}

        <span
          style={{
            fontSize: 10,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.tertiary,
            minWidth: 20,
            textAlign: "right",
          }}
        >
          {group.residents.length}/4
        </span>

        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.colors.text.tertiary}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Expandable body */}
      <div
        style={{
          maxHeight: expanded ? 220 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${theme.colors.border.light}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {group.residents.map((resident, i) => (
            <ResidentCell
              key={resident.id}
              resident={resident}
              onClick={() => onResidentClick(resident.id)}
              isLeftCol={i % 2 === 0}
              isTopRow={i < 2}
              totalCount={group.residents.length}
              index={i}
            />
          ))}
        </div>

        {/* Rounding footer when visited */}
        {group.lastVisitedMinutesAgo != null && (
          <div
            style={{
              padding: "5px 12px 6px",
              borderTop: `1px solid ${theme.colors.border.light}`,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.colors.text.tertiary}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              style={{
                fontSize: 10,
                color: theme.colors.text.tertiary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              Visited {group.lastVisitedMinutesAgo}m ago
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

interface ResidentCellProps {
  resident: Resident;
  onClick: () => void;
  isLeftCol: boolean;
  isTopRow: boolean;
  totalCount: number;
  index: number;
}

function ResidentCell({ resident, onClick, isLeftCol, isTopRow, totalCount, index }: ResidentCellProps) {
  const wellnessTrend = resident.wellness?.trend ?? "Medium";
  const wellnessColor = WELLNESS_DOT[wellnessTrend] ?? theme.colors.neutral[400];
  const wellnessLabel = WELLNESS_LABEL[wellnessTrend] ?? "";
  const hasBottomRow = totalCount > 2;
  const showBottomBorder = isTopRow && hasBottomRow;
  const showRightBorder = isLeftCol && index + 1 < totalCount;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        cursor: "pointer",
        borderRight: showRightBorder ? `1px solid ${theme.colors.border.light}` : "none",
        borderBottom: showBottomBorder ? `1px solid ${theme.colors.border.light}` : "none",
        boxSizing: "border-box",
        transition: "background 0.15s ease",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar name={resident.name} size={32} colors={resident.colors ?? []} />
        <div
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 9,
            height: 9,
            borderRadius: theme.borderRadius.full,
            background: wellnessColor,
            border: `1.5px solid ${theme.colors.background.primary}`,
          }}
        />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontSize: 12.5,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            display: "block",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {resident.name}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: theme.typography.fontWeight.medium,
            color: wellnessTrend === "Low" ? wellnessColor : theme.colors.text.tertiary,
            display: "block",
            marginTop: 2,
          }}
        >
          {resident.bed} · {wellnessLabel}
        </span>
      </div>
    </div>
  );
}
