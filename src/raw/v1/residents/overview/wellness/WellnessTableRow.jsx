import {UpArrowIcon} from "../../../../care/halo/icons/UpArrowIcon.jsx";
import {wellnessData} from "./data.js";

export function WellnessTableRow(props) {
    return <div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: "12px 16px",
            alignItems: "center",
        }}>
            <span style={{fontSize: 14, fontWeight: 600, color: "#333"}}>{props.item.label}</span>
            <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 4}}>
                  {props.item.hasArrow && <UpArrowIcon/>}
                <span style={{fontSize: 14, color: "#333"}}>{props.item.current}</span>
                </span>
            <span style={{fontSize: 14, color: "#333", textAlign: "right"}}>{props.item.previous}</span>
        </div>
        {props.i < wellnessData.length - 1 && (
            <div style={{height: 1, background: "#ECECEC", margin: "0 16px"}}/>
        )}
    </div>;
}