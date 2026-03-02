import {Avatar} from "../../ui/Avatar";
import type { ResidentCardProps } from "../../../types/resident.types";

export function ResidentCard(props: ResidentCardProps) {
    return <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 10px",
            background: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E8E4DE",
            cursor: "pointer",
        }}
    >
        <Avatar name={props.resident.name} size={40} colors={props.resident.colors}/>
        <div style={{minWidth: 0, flex: 1}}>
                  <span style={{
                      fontSize: 15, // Aumentado de 11px a 15px para legibilidad
                      fontWeight: 700,
                      color: "#1A1A1A",
                      display: "block",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                  }}>{props.resident.name}</span>
            <span style={{
                fontSize: 13, // Aumentado de 9.5px a 13px
                color: "#666", // Mejor contraste que #888
                fontWeight: 500, // Medium para mejor legibilidad
                display: "block",
                marginTop: 2,
            }}>{props.resident.room}</span>
        </div>
    </div>;
}
