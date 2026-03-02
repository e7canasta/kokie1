import { useState } from "react";

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#00BCD4" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const UpArrow = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="8" x2="5" y2="2" />
    <polyline points="2 5 5 2 8 5" />
  </svg>
);

export default function ResidentScreen() {
  const [activeTab, setActiveTab] = useState("Last 24h");
  const tabs = ["Last 24h", "Last 7 Days", "Last 30 Days"];

  const careActivities = [
    { activity: "Meals", initiated: "30 min", uninitiated: "16 min", total: "46 min" },
    { activity: "Toileting", initiated: "23 min", uninitiated: "0 min", total: "23 min" },
    { activity: "Transferring", initiated: "0 min", uninitiated: "23 min", total: "23 min" },
    { activity: "Medication", initiated: "0 min", uninitiated: "17 min", total: "17 min" },
    { activity: "Dressing", initiated: "0 min", uninitiated: "15 min", total: "15 min" },
  ];

  const wellnessData = [
    { label: "Falls", current: "3 falls", previous: "0 falls", hasArrow: true },
    { label: "Alert Activity", current: "32 / day", previous: "18 / day", hasArrow: true },
    { label: "Care Hours", current: "72 min / day", previous: "42 min / day", hasArrow: true },
  ];

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
        <div style={{ height: 10 }} />

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
          gap: 12,
        }}>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#333",
            display: "flex",
            alignItems: "center",
          }}>
            <ChevronLeft />
          </button>

          {/* Avatar */}
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(180deg, #3E8E7E 0%, #2E6B5E 50%, #1B4A40 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* Stylized avatar placeholder */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="15" r="8" fill="rgba(255,255,255,0.3)" />
                <ellipse cx="20" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            {/* Small icon badge */}
            <div style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#4DB6AC",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                <rect x="1" y="3" width="8" height="1.5" rx="0.5" />
                <rect x="1" y="5.5" width="5" height="1.5" rx="0.5" />
              </svg>
            </div>
          </div>

          {/* Name & Info */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.3px",
            }}>Robert Chen</h1>
            <p style={{
              fontSize: 13,
              color: "#666",
              margin: "2px 0 0 0",
              lineHeight: 1.3,
            }}>DOB: June 3, 1943</p>
            <p style={{
              fontSize: 13,
              color: "#666",
              margin: "1px 0 0 0",
              lineHeight: 1.3,
            }}>Room 203 | Unit: Memory Care</p>
          </div>

          <div style={{ flexShrink: 0, paddingTop: 2 }}>
            <StarIcon />
          </div>
        </div>

        {/* View Room Button */}
        <div style={{ padding: "8px 20px 16px" }}>
          <button style={{
            width: "100%",
            padding: "14px 0",
            background: "#2E7D6F",
            color: "white",
            border: "none",
            borderRadius: 28,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            letterSpacing: "0.5px",
          }}>
            <ExternalLinkIcon />
            VIEW ROOM
          </button>
        </div>

        {/* Wellness Card */}
        <div style={{
          margin: "0 20px",
          background: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid #E8E8E8",
          overflow: "hidden",
        }}>
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
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 11, color: "#999", display: "block", lineHeight: 1.2 }}>7 day avg</span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 2 }}>
                <UpArrow />
                <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Medium</span>
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 11, color: "#999", display: "block", lineHeight: 1.2 }}>Last 7 day avg</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333", display: "block", marginTop: 2 }}>Low</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ECECEC", margin: "0 16px" }} />

          {/* Wellness Rows */}
          {wellnessData.map((item, i) => (
            <div key={i}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "12px 16px",
                alignItems: "center",
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.label}</span>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  {item.hasArrow && <UpArrow />}
                  <span style={{ fontSize: 14, color: "#333" }}>{item.current}</span>
                </span>
                <span style={{ fontSize: 14, color: "#333", textAlign: "right" }}>{item.previous}</span>
              </div>
              {i < wellnessData.length - 1 && (
                <div style={{ height: 1, background: "#ECECEC", margin: "0 16px" }} />
              )}
            </div>
          ))}
        </div>

        {/* Top Care Activities */}
        <div style={{ padding: "24px 20px 0" }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1A1A1A",
            margin: "0 0 14px 0",
          }}>Top Care Activities</h2>

          {/* Tabs */}
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
            ))}
          </div>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
            padding: "0 0 10px 0",
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Activity</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Initiated</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>Uninitiated</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333", textAlign: "right" }}>Total</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ECECEC" }} />

          {/* Table Rows */}
          {careActivities.map((item, i) => (
            <div key={i}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
                padding: "13px 0",
                alignItems: "center",
              }}>
                <span style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>{item.activity}</span>
                <span style={{ fontSize: 14, color: "#555" }}>{item.initiated}</span>
                <span style={{ fontSize: 14, color: "#555" }}>{item.uninitiated}</span>
                <span style={{ fontSize: 14, color: "#333", fontWeight: 600, textAlign: "right" }}>{item.total}</span>
              </div>
              {i < careActivities.length - 1 && (
                <div style={{ height: 1, background: "#F0F0F0" }} />
              )}
            </div>
          ))}

          {/* View More */}
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
      </div>
    </>
  );
}
