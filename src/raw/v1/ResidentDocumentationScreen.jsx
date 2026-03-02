import { useState } from "react";

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function ResidentDocumentation() {
  const [accidentalPress, setAccidentalPress] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState(["Dressing", "Transferring"]);
  const [notes, setNotes] = useState("");

  const activities = [
    "Continence", "Dressing", "Feeding", "Medication",
    "Toileting", "Transferring", "Wandering / Safety", "Other"
  ];

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <>
      {/* Phone Frame */}
      <div style={{
      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      minHeight: "100vh",
      minHeight: "100vh",
        background: "#F4F4F2",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
         paddingTop: "8px"
      }}>
        {/* Status Bar */}
        {/**
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 24px 0",
          height: 28,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <svg width="14" height="10" viewBox="0 0 14 10">
              <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#1A1A1A" />
              <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="#1A1A1A" />
              <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="#1A1A1A" />
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#1A1A1A" />
            </svg>
            <svg width="13" height="10" viewBox="0 0 16 12" fill="#1A1A1A">
              <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM3.46 7.13a6.5 6.5 0 019.08 0l-.94.94a5.2 5.2 0 00-7.2 0l-.94-.94zM.64 4.35a10.14 10.14 0 0114.72 0l-.94.94a8.84 8.84 0 00-12.84 0L.64 4.35z" />
            </svg>
            <svg width="20" height="10" viewBox="0 0 25 12">
              <rect x="0" y="1" width="21" height="10" rx="2" stroke="#1A1A1A" strokeWidth="1" fill="none" />
              <rect x="2" y="3" width="17" height="6" rx="1" fill="#1A1A1A" />
              <rect x="22" y="4" width="2" height="4" rx="0.5" fill="#1A1A1A" />
            </svg>
          </div>
        </div>
        **/}

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 18px 6px",
            gap: 6,
          }}>
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              color: "#1A1A1A",
              display: "flex",
              alignItems: "center",
            }}>
              <ChevronLeft />
            </button>
            <h1 style={{
              fontSize: 16,
              fontWeight: 750,
              color: "#1A1A1A",
              margin: 0,
              letterSpacing: "-0.2px",
            }}>
              Resident Documentation
            </h1>
          </div>

          {/* Content */}
          <div style={{ padding: "0 20px" }}>

            {/* Resident Field */}
            <label style={{
              fontSize: 12,
              fontWeight: 650,
              color: "#1A1A1A",
              display: "block",
              marginBottom: 5,
              marginTop: 8,
            }}>
              Resident<span>*</span>
            </label>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: "#FFFFFF",
              borderRadius: 8,
              border: "1px solid #DCDCDC",
              marginBottom: 14,
            }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(180deg, #3E8E7E 0%, #2E6B5E 50%, #1B4A40 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="8" fill="rgba(255,255,255,0.3)" />
                    <ellipse cx="20" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>Robert Chen</span>
            </div>

            {/* Accidental eCall Press Toggle */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}>
              <button
                onClick={() => setAccidentalPress(!accidentalPress)}
                style={{
                  width: 40,
                  height: 24,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background: accidentalPress ? "#2E7D6F" : "#BDBDBD",
                  position: "relative",
                  transition: "background 0.25s ease",
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                <div style={{
                  width: 19,
                  height: 19,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  position: "absolute",
                  top: 2.5,
                  left: accidentalPress ? 18 : 2.5,
                  transition: "left 0.25s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </button>
              <span style={{ fontSize: 12.5, color: "#444", fontWeight: 450 }}>Accidental eCall Press</span>
            </div>

            {/* Care Activities */}
            <label style={{
              fontSize: 12,
              fontWeight: 650,
              color: "#1A1A1A",
              display: "block",
              marginBottom: 8,
            }}>
              Care Activities (Select all that apply)<span>*</span>
            </label>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginBottom: 20,
            }}>
              {activities.map((activity) => {
                const isSelected = selectedActivities.includes(activity);
                return (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    style={{
                      padding: "6px 13px",
                      borderRadius: 18,
                      border: isSelected ? "1.5px solid #2E9E8F" : "1px solid #C8C8C8",
                      background: isSelected ? "#2E9E8F" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "#3A3A3A",
                      fontSize: 12,
                      fontWeight: isSelected ? 600 : 450,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      lineHeight: 1.3,
                    }}
                  >
                    {activity}
                  </button>
                );
              })}
            </div>

            {/* Additional Notes */}
            <label style={{
              fontSize: 12,
              fontWeight: 650,
              color: "#1A1A1A",
              display: "block",
              marginBottom: 6,
            }}>
              Additional Notes
            </label>
            <div style={{ height: 1, background: "#D8D8D8", marginBottom: 0 }} />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tap to add"
              style={{
                width: "100%",
                minHeight: 80,
                padding: "10px 2px",
                borderRadius: 0,
                border: "none",
                borderBottom: "1px solid #D8D8D8",
                background: "transparent",
                fontSize: 12.5,
                color: "#333",
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: 20 }} />

          {/* Save Button */}
          <div style={{ padding: "12px 20px 30px" }}>
            <button style={{
              width: "100%",
              padding: "13px 0",
              background: "linear-gradient(135deg, #2B7A6B, #1F6B5E)",
              color: "white",
              border: "none",
              borderRadius: 26,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "1.5px",
              boxShadow: "0 4px 14px rgba(30,90,75,0.35)",
              textTransform: "uppercase",
            }}>
              SAVE
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 100,
          height: 4,
          borderRadius: 2,
          background: "#1A1A1A",
          opacity: 0.2,
        }} />
      </div>
    </>
  );
}
