import { theme } from "../../../design-system";
import type { ResidentsGridProps } from "../../../types/resident.types";

export function ResidentsGrid(props: ResidentsGridProps) {
  const residents = props.residents || [];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing.sm,
        padding: `0 ${theme.spacing.md} ${theme.spacing.md}`,
      }}
    >
      {residents.map(props.renderItem)}
    </div>
  );
}
