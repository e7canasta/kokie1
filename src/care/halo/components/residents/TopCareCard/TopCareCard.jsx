import {useState} from "react";
import {careActivities, timeRangeTabs} from "../../../domain/overview.js";

export function TopCareCard() {
    const [activeTab, setActiveTab] = useState(timeRangeTabs[0]);

    return (
        <div style={{padding: "24px 20px 0"}}>
            <h2 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1A1A1A",
                margin: "0 0 14px 0",
            }}>Top Care Activities</h2>

            <TimeRangeTabs tabs={timeRangeTabs} activeTab={activeTab} onTabChange={setActiveTab}/>

            <TableHeader/>

            <div style={{height: 1, background: "#ECECEC"}}/>

            {careActivities.map((item, i) => (
                <ActivityRow key={i} item={item} isLast={i === careActivities.length - 1}/>
            ))}

            <button style={{
                background: "none",
                border: "none",
                color: "#2E7D6F",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                padding: "14px 0 20px",
            }}>
                View More
            </button>
        </div>
    );
}

function TimeRangeTabs({tabs, activeTab, onTabChange}) {
    return (
        <div style={{
            display: "flex",
            background: "#F3F3F3",
            borderRadius: 25,
            padding: 3,
            marginBottom: 16,
        }}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    style={{
                        flex: 1,
                        padding: "9px 0",
                        border: "none",
                        borderRadius: 22,
                        fontSize: 12.5,
                        fontWeight: activeTab === tab ? 600 : 500,
                        cursor: "pointer",
                        background: activeTab === tab ? "#FFFFFF" : "transparent",
                        color: activeTab === tab ? "#1A1A1A" : "#888",
                        boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                        transition: "all 0.2s ease",
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

function TableHeader() {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
            padding: "0 0 10px 0",
        }}>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Activity</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Initiated</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Uninitiated</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333", textAlign: "right"}}>Total</span>
        </div>
    );
}

function ActivityRow({item, isLast}) {
    return (
        <div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
                padding: "13px 0",
                alignItems: "center",
            }}>
                <span style={{fontSize: 14, color: "#333", fontWeight: 500}}>{item.activity}</span>
                <span style={{fontSize: 14, color: "#555"}}>{item.initiated}</span>
                <span style={{fontSize: 14, color: "#555"}}>{item.uninitiated}</span>
                <span style={{fontSize: 14, color: "#333", fontWeight: 600, textAlign: "right"}}>{item.total}</span>
            </div>
            {!isLast && <div style={{height: 1, background: "#F0F0F0"}}/>}
        </div>
    );
}
