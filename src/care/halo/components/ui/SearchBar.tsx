import { theme } from "../../design-system";
import { SearchIcon } from "../../icons/SearchIcon";
import type { SearchBarProps } from "../../types/resident.types";

export function SearchBar(props: SearchBarProps) {
  return (
    <div style={{ padding: `10px ${theme.spacing.md} 12px` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.sm,
          padding: "12px 16px",
          background: theme.colors.background.primary,
          borderRadius: theme.borderRadius.full,
          border: `1px solid ${theme.colors.border.medium}`,
          boxShadow: theme.shadows.sm,
        }}
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Resident Search"
          value={props.value}
          onChange={props.onChange}
          style={{
            border: "none",
            outline: "none",
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.primary,
            background: "transparent",
            width: "100%",
            fontFamily: "inherit",
            fontWeight: theme.typography.fontWeight.medium,
          }}
        />
      </div>
    </div>
  );
}
