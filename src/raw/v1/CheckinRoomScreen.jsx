import { useState } from "react";

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CameraFeed = ({ label, time, hue, brightness, angle, furniture }) => {
  // Generate a unique room scene using CSS for each camera
  const scenes = {
    sitting: (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        {/* Dark room base */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #1a2a1f 0%, #0d1a14 40%, #162218 100%)" }} />
        {/* Floor */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, #2a3d30 0%, #3a5040 50%, #4a5d4a 100%)", transform: "perspective(200px) rotateX(5deg)", transformOrigin: "bottom" }} />
        {/* Carpet / rug area */}
        <div style={{ position: "absolute", bottom: "8%", left: "15%", width: "60%", height: "25%", background: "linear-gradient(135deg, #5a7a6a, #4a6858)", borderRadius: 4, opacity: 0.6, transform: "perspective(300px) rotateX(15deg)" }} />
        {/* Bed / furniture - left */}
        <div style={{ position: "absolute", bottom: "20%", left: "5%", width: "35%", height: "35%", background: "linear-gradient(135deg, #6a8a7a, #8ab0a0)", borderRadius: "4px 4px 0 0", opacity: 0.7 }} />
        {/* Blanket texture */}
        <div style={{ position: "absolute", bottom: "25%", left: "7%", width: "30%", height: "18%", background: "linear-gradient(90deg, #9ac0b0, #7aa898, #9ac0b0)", borderRadius: 3, opacity: 0.5 }} />
        {/* Dresser - right */}
        <div style={{ position: "absolute", bottom: "30%", right: "8%", width: "25%", height: "40%", background: "linear-gradient(180deg, #8a6a3a, #6a4a20)", borderRadius: "3px 3px 0 0" }} />
        {/* Dresser drawers */}
        <div style={{ position: "absolute", bottom: "35%", right: "10%", width: "21%", height: "3%", background: "#5a3a10", borderRadius: 1 }} />
        <div style={{ position: "absolute", bottom: "42%", right: "10%", width: "21%", height: "3%", background: "#5a3a10", borderRadius: 1 }} />
        <div style={{ position: "absolute", bottom: "49%", right: "10%", width: "21%", height: "3%", background: "#5a3a10", borderRadius: 1 }} />
        {/* Items on dresser */}
        <div style={{ position: "absolute", bottom: "55%", right: "12%", width: "8%", height: "8%", background: "#c04020", borderRadius: 2, opacity: 0.8 }} />
        <div style={{ position: "absolute", bottom: "56%", right: "22%", width: "5%", height: "6%", background: "#e0a040", borderRadius: "50%", opacity: 0.7 }} />
        {/* Wall detail - window light */}
        <div style={{ position: "absolute", top: "10%", left: "40%", width: "20%", height: "30%", background: "radial-gradient(ellipse, rgba(100,140,120,0.3), transparent)", borderRadius: "50%" }} />
        {/* Camera fisheye vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
      </div>
    ),
    bedside: (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        {/* Room base */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, #d0c8b8 0%, #b8b0a0 30%, #a8a090 100%)" }} />
        {/* Floor - wood */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, #b8a078 0%, #c8a878 50%, #d0b888 100%)", transform: "perspective(200px) rotateX(5deg)", transformOrigin: "bottom" }} />
        {/* Floor planks */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ position: "absolute", bottom: `${i * 10}%`, left: 0, right: 0, height: 1, background: "rgba(150,120,80,0.3)" }} />
        ))}
        {/* Bed frame */}
        <div style={{ position: "absolute", bottom: "15%", left: "20%", width: "55%", height: "45%", background: "linear-gradient(135deg, #e8e0d8, #d0c8c0)", borderRadius: 4, border: "2px solid #c0b8a8" }} />
        {/* Mattress/sheets */}
        <div style={{ position: "absolute", bottom: "20%", left: "22%", width: "51%", height: "30%", background: "linear-gradient(90deg, #e8f0f0, #d0e0e8, #c0d8e0)", borderRadius: 3 }} />
        {/* Pillow */}
        <div style={{ position: "absolute", bottom: "40%", left: "24%", width: "18%", height: "10%", background: "#f0f0e8", borderRadius: 8, opacity: 0.9 }} />
        {/* Blue item on bed */}
        <div style={{ position: "absolute", bottom: "25%", right: "25%", width: "12%", height: "8%", background: "#4090c0", borderRadius: 3, opacity: 0.8 }} />
        {/* Wall art/frame */}
        <div style={{ position: "absolute", top: "12%", right: "20%", width: "22%", height: "18%", background: "#2a2a3a", borderRadius: 2, border: "2px solid #888" }} />
        <div style={{ position: "absolute", top: "14%", right: "21%", width: "18%", height: "13%", background: "linear-gradient(135deg, #5a6a8a, #3a4a6a)", borderRadius: 1 }} />
        {/* Nightstand */}
        <div style={{ position: "absolute", bottom: "25%", left: "5%", width: "14%", height: "25%", background: "linear-gradient(180deg, #b0a080, #907850)", borderRadius: 2 }} />
        {/* Lamp glow */}
        <div style={{ position: "absolute", top: "20%", left: "6%", width: "12%", height: "12%", background: "radial-gradient(ellipse, rgba(255,200,100,0.4), transparent)", borderRadius: "50%" }} />
        {/* Camera vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
      </div>
    ),
    hallway: (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
        {/* Hallway base - lighter */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #d8d0c0 0%, #c8c0b0 40%, #b8b0a0 100%)" }} />
        {/* Floor */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(180deg, #c0b898 0%, #b0a888 50%, #a89870 100%)", transform: "perspective(200px) rotateX(3deg)", transformOrigin: "bottom" }} />
        {/* Hallway perspective - left wall */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "65%", background: "linear-gradient(90deg, #e0d8c8, #d0c8b8)", borderRight: "1px solid #c0b8a0" }} />
        {/* Door frame */}
        <div style={{ position: "absolute", top: "8%", left: "35%", width: "28%", height: "58%", background: "linear-gradient(180deg, #302820, #201810)", borderRadius: "2px 2px 0 0", border: "3px solid #c0b090" }} />
        {/* Door inside - dark room */}
        <div style={{ position: "absolute", top: "10%", left: "37%", width: "24%", height: "52%", background: "linear-gradient(180deg, #1a1410, #0a0808)" }} />
        {/* Furniture visible through door */}
        <div style={{ position: "absolute", top: "30%", left: "40%", width: "15%", height: "20%", background: "#4a3a20", borderRadius: 2, opacity: 0.6 }} />
        {/* Right wall */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "30%", height: "65%", background: "linear-gradient(270deg, #e0d8c8, #d0c8b8)" }} />
        {/* Baseboard */}
        <div style={{ position: "absolute", bottom: "33%", left: 0, right: 0, height: "3%", background: "#d0c8b0" }} />
        {/* Ceiling light glow */}
        <div style={{ position: "absolute", top: "0%", left: "30%", width: "40%", height: "20%", background: "radial-gradient(ellipse, rgba(255,245,220,0.5), transparent)", borderRadius: "50%" }} />
        {/* Camera vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
      </div>
    ),
  };

  return (
    <div style={{
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      height: 142,
      background: "#111",
    }}>
      {/* Camera scene */}
      {scenes[furniture]}

      {/* Label overlay - bottom left */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px 12px 10px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#FFFFFF",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}>
          {label} - {time}
        </span>
      </div>

      {/* Expand icon - top right */}
      <button style={{
        position: "absolute",
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        borderRadius: 6,
        background: "rgba(0,0,0,0.35)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}>
        <ExpandIcon />
      </button>

      {/* Live indicator dot */}
      <div style={{
        position: "absolute",
        top: 10,
        left: 12,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#4ADE80",
          boxShadow: "0 0 6px rgba(74,222,128,0.6)",
        }} />
      </div>
    </div>
  );
};

export default function CheckInRoomScreen() {
  return (
    <>
      {/* Phone Frame */}
      <div style={{
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: "100%",
        minWidth: "100vw",
        minHeight: "100vh",
        background: "#FFFFFF",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Header Row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px 4px",
          flexShrink: 0,
        }}>
          <h1 style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1A1A1A",
            margin: 0,
            letterSpacing: "-0.3px",
          }}>
            Check In – Room 203
          </h1>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}>
            <CloseIcon />
          </button>
        </div>

        {/* Camera Feeds */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <CameraFeed
            label="Sitting Area"
            time="Today at 9:41am"
            furniture="sitting"
          />
          <CameraFeed
            label="Bedside"
            time="Today at 9:41am"
            furniture="bedside"
          />
          <CameraFeed
            label="Hallway"
            time="Today at 9:41am"
            furniture="hallway"
          />
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
          opacity: 0.15,
        }} />
      </div>
    </>
  );
}
