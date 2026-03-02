import { theme } from "../../../design-system";
import type { ResidentsGridProps } from "../../../types/resident.types";

export function ResidentsGrid(props: ResidentsGridProps) {
  const residents = props.residents || [];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        padding: `0 ${theme.spacing.md} 6px`,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      {residents.map(props.renderItem)}
    </div>
  );
}
