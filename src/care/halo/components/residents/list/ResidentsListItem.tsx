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
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "#1A1A1A",
                        display: "block",
                        lineHeight: 1.2,
                    }}>{props.resident.name}</span>
                <span style={{
                    fontSize: 11.5,
                    color: "#888",
                    fontWeight: 400,
                    display: "block",
                    marginTop: 2,
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
