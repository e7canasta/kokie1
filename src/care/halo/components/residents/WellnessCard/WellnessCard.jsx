import {UpArrowIcon} from "../../../icons/UpArrowIcon.jsx";

export function WellnessCard({data}) {
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

function WellnessHeader({trend, previousTrend}) {
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
                <span style={{fontSize: 11, color: "#999", display: "block", lineHeight: 1.2}}>7 day avg</span>
                <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 2}}>
                    <UpArrowIcon/>
                    <span style={{fontSize: 15, fontWeight: 600, color: "#333"}}>{trend}</span>
                </span>
            </div>
            <div style={{textAlign: "right"}}>
                <span style={{fontSize: 11, color: "#999", display: "block", lineHeight: 1.2}}>Last 7 day avg</span>
                <span style={{fontSize: 15, fontWeight: 600, color: "#333", display: "block", marginTop: 2}}>{previousTrend}</span>
            </div>
        </div>
    );
}

function WellnessRow({item, isLast}) {
    return (
        <div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "12px 16px",
                alignItems: "center",
            }}>
                <span style={{fontSize: 14, fontWeight: 600, color: "#333"}}>{item.label}</span>
                <span style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 4}}>
                    {item.hasArrow && <UpArrowIcon/>}
                    <span style={{fontSize: 14, color: "#333"}}>{item.current}</span>
                </span>
                <span style={{fontSize: 14, color: "#333", textAlign: "right"}}>{item.previous}</span>
            </div>
            {!isLast && <div style={{height: 1, background: "#ECECEC", margin: "0 16px"}}/>}
        </div>
    );
}
