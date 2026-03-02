import { theme } from "../../../design-system";
import type { ResidentsListProps } from "../../../types/resident.types";

export function ResidentsList(props: ResidentsListProps) {
  const residents = props.residents || [];
  return (
    <div style={{ background: theme.colors.background.primary }}>
      {residents.map((resident, i) => props.renderItem(resident, i))}
    </div>
  );
}
