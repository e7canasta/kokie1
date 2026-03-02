import { theme } from "../../design-system";
import { Avatar } from "../ui/Avatar";
import type { Resident, RoomGroup } from "../../types/resident.types";

const WELLNESS_COLORS: Record<string, string> = {
  High: theme.colors.success,
  Medium: theme.colors.warning,
  Low: theme.colors.error,
};

interface RoomCardProps {
  group: RoomGroup;
  onResidentClick: (id: number) => void;
}

export function RoomCard({ group, onResidentClick }: RoomCardProps) {
  return (
    <div
      style={{
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.light}`,
        overflow: "hidden",
      }}
    >
      {/* Room header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: theme.colors.primary[50],
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[600],
            }}
          >
            Room {group.room}
          </span>
          <span
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
            }}
          >
            {group.unit}
          </span>
        </div>
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.tertiary,
          }}
        >
          {group.residents.length} {group.residents.length === 1 ? "bed" : "beds"}
        </span>
      </div>

      {/* Residents 2-col grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: group.residents.length === 1 ? "1fr" : "1fr 1fr",
          gap: 0,
        }}
      >
        {group.residents.map((resident, i) => (
          <ResidentCell
            key={resident.id}
            resident={resident}
            onClick={() => onResidentClick(resident.id)}
            showRightBorder={group.residents.length > 1 && i % 2 === 0}
            showBottomBorder={i < group.residents.length - 2}
          />
        ))}
      </div>
    </div>
  );
}

interface ResidentCellProps {
  resident: Resident;
  onClick: () => void;
  showRightBorder: boolean;
  showBottomBorder: boolean;
}

function ResidentCell({ resident, onClick, showRightBorder, showBottomBorder }: ResidentCellProps) {
  const wellnessColor = WELLNESS_COLORS[resident.wellness?.trend] ?? theme.colors.neutral[400];

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        cursor: "pointer",
        borderRight: showRightBorder ? `1px solid ${theme.colors.border.light}` : "none",
        borderBottom: showBottomBorder ? `1px solid ${theme.colors.border.light}` : "none",
        minHeight: 56,
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar name={resident.name} size={36} colors={resident.colors ?? []} />
        {/* Wellness dot */}
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
      <div style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            display: "block",
            lineHeight: theme.typography.lineHeight.tight,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {resident.name}
        </span>
        {resident.bed && (
          <span
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.tertiary,
              display: "block",
              marginTop: 2,
            }}
          >
            Bed {resident.bed}
          </span>
        )}
      </div>
    </div>
  );
}
