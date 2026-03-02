import {StarFilledIcon} from "../../../icons/StarFilledIcon";
import {StarOutline} from "../../../icons/StarOutlineIcon";
import type { ResidentsListItemProps } from "../../../types/resident.types";

export function ResidentsListItem(props: ResidentsListItemProps) {
    const totalResidents = props.totalResidents || 0;
    return <div>
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 18px",
            gap: 0,
            cursor: "pointer",
        }}>
            <div style={{flex: 1}}>
                    <span style={{
                        fontSize: 16, // Aumentado de 13.5px a 16px
                        fontWeight: 700,
                        color: "#1A1A1A",
                        display: "block",
                        lineHeight: 1.4, // Mejor spacing
                    }}>{props.resident.name}</span>
                <span style={{
                    fontSize: 14, // Aumentado de 11.5px a 14px (mínimo legible)
                    color: "#666", // Mejor contraste
                    fontWeight: 500, // Medium para mejor legibilidad
                    display: "block",
                    marginTop: 3, // Más espacio
                }}>{props.resident.room}</span>
            </div>
            <div style={{flexShrink: 0, cursor: "pointer"}}>
                {props.resident.starred ? <StarFilledIcon/> : <StarOutline/>}
            </div>
        </div>
        {props.i < totalResidents - 1 && (
            <div style={{height: 1, background: "#F0EFED", margin: "0 18px"}}/>
        )}
    </div>;
}
