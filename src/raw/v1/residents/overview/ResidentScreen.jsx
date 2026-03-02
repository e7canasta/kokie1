import {useState} from "react";
import {careActivities} from "./data.js";
import {HeaderSection} from "./HeaderSection.jsx";
import {ViewRoomButton} from "./ViewRoomButton.jsx";
import {WellnessTableRow} from "./WellnessTableRow.jsx";
import {WellnessCard} from "./WellnessCard.jsx";
import {TopCareActivitiesCard} from "./TopCareActivitiesCard.jsx";


export default function ResidentScreen() {
  const [activeTab, setActiveTab] = useState("Last 24h");
  const tabs = ["Last 24h", "Last 7 Days", "Last 30 Days"];

  return (
    <>
      {/* Phone Frame */}
      <div style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#FFFFFF",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Status Bar space */}
        <div style={{height: 10}}/>

        <HeaderSection/>

        {/* View Room Button */}
        <div style={{padding: "8px 20px 16px"}}>
          <ViewRoomButton/>
        </div>

        <WellnessCard callbackfn={(item, i) => (
            <WellnessTableRow key={i} item={item} i={i}/>
        )}/>

        <TopCareActivitiesCard strings={tabs} callbackfn={(tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
        )} callbackfn1={(item, i) => (
            <div key={i}>
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
              {i < careActivities.length - 1 && (
                  <div style={{height: 1, background: "#F0F0F0"}}/>
              )}
            </div>
        )}/>


      </div>
    </>
  );
}
