import { theme } from "../../../design-system";
import { StarFilledIcon } from "../../../icons/StarFilledIcon";
import { StarOutline } from "../../../icons/StarOutlineIcon";
import type { ResidentsListItemProps } from "../../../types/resident.types";

export function ResidentsListItem(props: ResidentsListItemProps) {
  const totalResidents = props.totalResidents || 0;
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 18px",
          gap: 0,
          cursor: "pointer",
          minHeight: 56,
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              display: "block",
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            {props.resident.name}
          </span>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              fontWeight: theme.typography.fontWeight.medium,
              display: "block",
              marginTop: 4,
            }}
          >
            {props.resident.room}
          </span>
        </div>
        <div
          style={{
            flexShrink: 0,
            cursor: "pointer",
            padding: theme.spacing.xs,
          }}
        >
          {props.resident.starred ? <StarFilledIcon /> : <StarOutline />}
        </div>
      </div>
      {props.i < totalResidents - 1 && (
        <div
          style={{
            height: 1,
            background: theme.colors.border.light,
            margin: "0 18px",
          }}
        />
      )}
    </div>
  );
}
