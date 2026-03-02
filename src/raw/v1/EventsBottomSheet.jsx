import { useState } from "react";

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ResidentsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const StaffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ClaimIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 16 10" />
  </svg>
);

const ClipboardIcon = ({ color = "rgba(255,255,255,0.9)", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function EventsBottomSheet() {
  const [sheetOpen, setSheetOpen] = useState(true);

  const events = [
    {
      id: 1,
      name: "Room 101",
      subtitle: null,
      tag: "Fall",
      time: "1m 7s",
      timeColor: "#333",
      iconType: "fall",
    },
    {
      id: 2,
      name: "Robert C.",
      subtitle: "2nd Floor East Wing",
      tag: null,
      time: "13m 7s",
      timeColor: "#E53935",
      iconType: "clipboard",
      highlighted: true,
    },
  ];

  const navItems = [
    { icon: <HomeIcon />, label: "Events", active: true },
    { icon: <SearchIcon />, label: "Discover", active: false },
    { icon: <ResidentsIcon />, label: "Residents", active: false },
    { icon: <StaffIcon />, label: "Staff", active: false },
    { icon: <MenuIcon />, label: "Menu", active: false },
  ];

  return (
    <>
      {/* Phone Frame */}
      <div style={{
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: "100vh",
        minWeight: "100vw",
        background: "#FFFFFF",
        borderRadius: 44,
        overflow: "hidden",
        boxShadow: "0 30px 90px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.12)",
        border: "9px solid #1A1A1A",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ===== BACKGROUND CONTENT (dimmed when sheet open) ===== */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          filter: sheetOpen ? "brightness(0.4)" : "none",
          transition: "filter 0.3s ease",
          pointerEvents: sheetOpen ? "none" : "auto",
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

          {/* Welcome Header */}
          <div style={{
            background: "#FFFFFF",
            padding: "10px 20px 14px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}>
            <div>
              <h1 style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#1A1A1A",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.3px",
              }}>Welcome, Carla.</h1>
              <p style={{
                fontSize: 12.5,
                color: "#555",
                margin: "4px 0 0 0",
                fontWeight: 400,
              }}>
                You've completed <span style={{ color: "#2E7D6F", fontWeight: 700 }}>8 events</span> today.
              </p>
            </div>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8B6914, #A0784A)",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid #E8E0D0",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #B08850 0%, #8B6930 40%, #6B4D20 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="13" r="7" fill="rgba(60,40,20,0.5)" />
                  <ellipse cx="20" cy="32" rx="12" ry="9" fill="rgba(60,40,20,0.35)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Not Claimed */}
          <div style={{ padding: "10px 20px 6px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#555" }}>Not Claimed (1)</span>
          </div>
          <div style={{ height: 1, background: "#ECECEC", margin: "0 20px" }} />

          {/* Event List */}
          {events.map((event, i) => (
            <div key={event.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  gap: 12,
                  cursor: event.id === 2 ? "pointer" : "default",
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: event.iconType === "clipboard" ? "#FFF" : "#F0F0F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: event.iconType === "clipboard" ? "2px solid #C55A11" : "1.5px solid #E0E0E0",
                }}>
                  {event.iconType === "fall" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="14" cy="4" r="2" fill="#555" stroke="none" />
                      <path d="M7 22l3-8 3 1v-6l3-2" />
                      <path d="M13 9l4 3" />
                    </svg>
                  )}
                  {event.iconType === "clipboard" && (
                    <ClipboardIcon color="#C55A11" size={20} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", display: "flex", alignItems: "center", gap: 6 }}>
                    {event.name}
                  </span>
                  {event.tag && (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="#E53935"><path d="M6 1L1 11h10L6 1z" /></svg>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#E53935" }}>Fall</span>
                    </div>
                  )}
                  {event.subtitle && (
                    <p style={{ fontSize: 11, color: "#888", margin: "2px 0 0", fontWeight: 400 }}>{event.subtitle}</p>
                  )}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: event.timeColor, flexShrink: 0 }}>{event.time}</span>
              </div>
              {i < events.length - 1 && (
                <div style={{ height: 1, background: "#F0F0F0", margin: "0 20px 0 70px" }} />
              )}
            </div>
          ))}
        </div>

        {/* ===== BOTTOM SHEET ===== */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          transform: sheetOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
          zIndex: 20,
          paddingBottom: 16,
        }}>
          {/* Drag Handle */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0 6px",
          }}>
            <div style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "#D0D0D0",
            }} />
          </div>

          {/* Sheet Content */}
          <div style={{ padding: "4px 20px 0" }}>

            {/* Header Row: Icon + Name + Close + Time/Badge */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 10,
            }}>
              {/* Clipboard Icon with orange ring */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "2px solid #C55A11",
              }}>
                <ClipboardIcon color="#C55A11" size={21} />
              </div>

              {/* Name & Location */}
              <div style={{ flex: 1, paddingTop: 2 }}>
                <span style={{
                  fontSize: 15,
                  fontWeight: 750,
                  color: "#1A1A1A",
                  display: "block",
                  lineHeight: 1.2,
                }}>Robert Chen</span>
                <span style={{
                  fontSize: 11.5,
                  color: "#888",
                  fontWeight: 400,
                  display: "block",
                  marginTop: 2,
                }}>2nd Floor East Wing</span>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSheetOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#F0F0F0",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Time + Escalation Badge Row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
              paddingLeft: 50,
            }}>
              {/* VIEW EVENT HISTORY link */}
              <span style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: "#2E7D6F",
                letterSpacing: "0.2px",
                cursor: "pointer",
              }}>VIEW EVENT HISTORY</span>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Time */}
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#E53935",
                }}>13m 7s</span>
                {/* Escalation Badge */}
                <span style={{
                  background: "#E53935",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 4,
                  letterSpacing: "0.2px",
                }}>Escalation</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#ECECEC", marginBottom: 14 }} />

            {/* VIEW ROOM Button */}
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: "#FFFFFF",
              border: "1.5px solid #D8D8D8",
              borderRadius: 26,
              color: "#333",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              letterSpacing: "0.8px",
              marginBottom: 10,
            }}>
              <ExternalLinkIcon />
              VIEW ROOM
            </button>

            {/* CLAIM Button */}
            <button
              onClick={() => setSheetOpen(false)}
              style={{
                width: "100%",
                padding: "13px 0",
                background: "linear-gradient(135deg, #1A6356, #257D6E)",
                border: "none",
                borderRadius: 26,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                letterSpacing: "1px",
                boxShadow: "0 4px 16px rgba(26,99,86,0.35)",
              }}
            >
              <ClaimIcon />
              CLAIM
            </button>
          </div>
        </div>

        {/* Tap to reopen (when closed) */}
        {!sheetOpen && (
          <button
            onClick={() => setSheetOpen(true)}
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #1A6356, #257D6E)",
              color: "white",
              border: "none",
              borderRadius: 20,
              padding: "8px 20px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(26,99,86,0.3)",
              zIndex: 25,
              letterSpacing: "0.3px",
            }}
          >
            Tap Robert C. to reopen
          </button>
        )}
      </div>
    </>
  );
}
