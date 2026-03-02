import { theme } from "../../design-system";
import { Avatar } from "../ui/Avatar";
import type { Resident, RoomGroup } from "../../types/resident.types";

const WELLNESS_COLORS: Record<string, string> = {
  High: theme.colors.success,
  Medium: theme.colors.warning,
  Low: theme.colors.error,
};

const WELLNESS_LABELS: Record<string, string> = {
  High: "Stable",
  Medium: "Monitor",
  Low: "Attention",
};

interface RoomCardProps {
  group: RoomGroup;
  onResidentClick: (id: number) => void;
}

export function RoomCard({ group, onResidentClick }: RoomCardProps) {
  const lowCount = group.residents.filter((r) => r.wellness?.trend === "Low").length;

  return (
    <div
      style={{
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.sm,
        border: `1px solid ${theme.colors.border.light}`,
        overflow: "hidden",
      }}
    >
      {/* Compact room header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 12px",
          background: theme.colors.primary[50],
          borderBottom: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary[700],
          }}
        >
          Room {group.room}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
          <span
            style={{
              fontSize: 11,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.tertiary,
            }}
          >
            {group.residents.length}/4
          </span>
        </div>
      </div>

      {/* Residents 2-col grid */}
      <div
        style={{
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
  const wellnessColor = WELLNESS_COLORS[wellnessTrend] ?? theme.colors.neutral[400];
  const wellnessLabel = WELLNESS_LABELS[wellnessTrend] ?? "";
  const hasBottomRow = totalCount > 2;
  const showBottomBorder = isTopRow && hasBottomRow;
  const showRightBorder = isLeftCol && (index + 1 < totalCount);

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
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar name={resident.name} size={34} colors={resident.colors ?? []} />
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
            fontSize: 13,
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
            fontSize: 10.5,
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
