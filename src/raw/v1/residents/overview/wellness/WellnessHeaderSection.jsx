import {UpArrowIcon} from "../../../../care/halo/icons/UpArrowIcon.jsx";

export function WellnessHeaderSection() {
    return <>
        {/* Wellness Header */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: "14px 16px 10px",
            alignItems: "baseline",
        }}>
            <span style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#2E7D6F",
            }}>Wellness</span>
            <div style={{textAlign: "center"}}>
                <span style={{fontSize: 11, color: "#999", display: "block", lineHeight: 1.2}}>7 day avg</span>
                <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 2}}>
                <UpArrowIcon/>
                <span style={{fontSize: 15, fontWeight: 600, color: "#333"}}>Medium</span>
              </span>
            </div>
            <div style={{textAlign: "right"}}>
                <span style={{fontSize: 11, color: "#999", display: "block", lineHeight: 1.2}}>Last 7 day avg</span>
                <span style={{fontSize: 15, fontWeight: 600, color: "#333", display: "block", marginTop: 2}}>Low</span>
            </div>
        </div>
    </>;
}