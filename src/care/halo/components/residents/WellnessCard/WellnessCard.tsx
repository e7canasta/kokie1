import {UpArrowIcon} from "../../../icons/UpArrowIcon";
import type { WellnessCardProps, WellnessDataItem } from "../../../types/resident.types";

export function WellnessCard({data}: WellnessCardProps) {
    return (
        <div style={{
            margin: "0 20px",
            background: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E8E8E8",
            overflow: "hidden",
        }}>
            <WellnessHeader trend={data.trend} previousTrend={data.previousTrend}/>

            <div style={{height: 1, background: "#ECECEC", margin: "0 16px"}}/>

            {data.items.map((item, i) => (
                <WellnessRow key={i} item={item} isLast={i === data.items.length - 1}/>
            ))}
        </div>
    );
}

interface WellnessHeaderProps {
    trend?: "Low" | "Medium" | "High";
    previousTrend?: "Low" | "Medium" | "High";
}

function WellnessHeader({trend, previousTrend}: WellnessHeaderProps) {
    return (
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
                <span style={{fontSize: 12, color: "#666", display: "block", lineHeight: 1.3, fontWeight: 500}}>7 day avg</span>
                <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4}}>
                    <UpArrowIcon/>
                    <span style={{fontSize: 17, fontWeight: 700, color: "#1A1A1A"}}>{trend}</span>
                </span>
            </div>
            <div style={{textAlign: "right"}}>
                <span style={{fontSize: 12, color: "#666", display: "block", lineHeight: 1.3, fontWeight: 500}}>Last 30 days</span>
                <span style={{fontSize: 17, fontWeight: 700, color: "#1A1A1A", display: "block", marginTop: 4}}>{previousTrend}</span>
            </div>
        </div>
    );
}

interface WellnessRowProps {
    item: WellnessDataItem;
    isLast: boolean;
}

function WellnessRow({item, isLast}: WellnessRowProps) {
    // Asegurar que siempre tengamos un valor para previous
    const previousValue = item.previous ?? item.value ?? "-";
    
    return (
        <div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "12px 16px",
                alignItems: "center",
            }}>
                <span style={{fontSize: 15, fontWeight: 600, color: "#1A1A1A"}}>{item.label}</span>
                <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 4}}>
                    {item.hasArrow && <UpArrowIcon/>}
                    <span style={{fontSize: 15, fontWeight: 600, color: "#1A1A1A"}}>{item.current || item.value || "-"}</span>
                </span>
                <span style={{fontSize: 15, fontWeight: 500, color: "#666", textAlign: "right"}}>{previousValue}</span>
            </div>
            {!isLast && <div style={{height: 1, background: "#ECECEC", margin: "0 16px"}}/>}
        </div>
    );
}
