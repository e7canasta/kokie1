import type { ResidentsListProps } from "../../../types/resident.types";

export function ResidentsList(props: ResidentsListProps) {
    const residents = props.residents || [];
    return <>
        {/* All Residents List */}
        <div style={{background: "#FFFFFF", margin: "0 0px"}}>
            {residents.map((resident, i) => props.renderItem(resident, i))}
        </div>
    </>;
}
