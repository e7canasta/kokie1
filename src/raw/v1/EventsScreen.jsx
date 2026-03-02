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

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const FallIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#E53935">
    <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z" />
    <rect x="11" y="10" width="2" height="4" fill="#E53935" />
    <rect x="11" y="15.5" width="2" height="2" fill="#E53935" />
  </svg>
);

const WalkingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13" cy="4.5" r="2" fill="#333" stroke="none" />
    <path d="M10 10.5l2-1.5 2 1 1 4-3 2.5v4" />
    <path d="M7 22l3-7.5" />
    <path d="M10 10.5L7 14" />
  </svg>
);

const BathroomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v3a2 2 0 002 2h8a2 2 0 002-2V3" />
    <rect x="4" y="8" width="16" height="2" rx="1" fill="#333" stroke="none" />
    <path d="M7 10v6a4 4 0 004 4h2a4 4 0 004-4v-6" />
    <line x1="7" y1="20" x2="7" y2="22" />
    <line x1="17" y1="20" x2="17" y2="22" />
  </svg>
);

export default function EventsScreen() {
  const [activeTab, setActiveTab] = useState("Not Claimed");

  const events = [
    {
      id: 1,
      icon: "fall",
      name: "Room 101",
      subtitle: null,
      tag: "Fall",
      time: "1m 7s",
      timeColor: "#333",
      avatarBg: null,
      iconType: "fall",
    },
    {
      id: 2,
      icon: "person",
      name: "Robert C.",
      subtitle: "2nd Floor East Wing",
      tag: null,
      time: "13m 7s",
      timeColor: "#E53935",
      avatarBg: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
      iconType: "person",
      highlighted: true,
    },
    {
      id: 3,
      icon: "walking",
      name: "Ashlynn P.",
      subtitle: "2nd Floor West Wing",
      tag: null,
      time: "8m 15s",
      timeColor: "#333",
      avatarBg: null,
      iconType: "walking",
    },
    {
      id: 4,
      icon: "bathroom",
      name: "Room 101",
      subtitle: "Bathroom",
      tag: null,
      time: "3m 26s",
      timeColor: "#333",
      avatarBg: null,
      iconType: "bathroom",
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
        minWidth: "100vw",
        minHeight: "100vh",
        background: "#FFFFFF",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
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

        {/* Welcome Header - Dark teal */}
        <div style={{
          background: "linear-gradient(135deg, #1B5E50, #2A7568)",
          padding: "14px 20px 16px",
          flexShrink: 0,
        }}>
          <h1 style={{
            fontSize: 17,
            fontWeight: 750,
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.2,
          }}>
            Welcome, Derek.
          </h1>
          <p style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
            margin: "3px 0 0 0",
          }}>
            You've completed <span style={{ color: "#4DD0C0", fontWeight: 600 }}>8 events</span> today.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          padding: "0 20px",
          borderBottom: "1px solid #E8E8E8",
          flexShrink: 0,
          background: "#FFFFFF",
        }}>
          {["Not Claimed", "Claimed"].map((tab) => {
            const count = tab === "Not Claimed" ? 4 : 1;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2.5px solid #1A1A1A" : "2.5px solid transparent",
                  padding: "10px 14px 8px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#1A1A1A" : "#999",
                  marginRight: 4,
                }}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Event List */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          background: "#FFFFFF",
        }}>
          {events.map((event, i) => (
            <div key={event.id}>
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                gap: 12,
                background: event.highlighted ? "rgba(46,126,111,0.06)" : "transparent",
                borderLeft: event.highlighted ? "3px solid #2E7D6F" : "3px solid transparent",
              }}>
                {/* Icon / Avatar */}
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: event.avatarBg || "#F0F0F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: event.iconType === "fall" ? "1.5px solid #E0E0E0" : event.highlighted ? "2px solid #2E7D6F" : "1.5px solid #E0E0E0",
                }}>
                  {event.iconType === "fall" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <circle cx="14" cy="4" r="2" fill="#555" stroke="none" />
                      <path d="M7 22l3-8 3 1v-6l3-2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 9l4 3" strokeLinecap="round" />
                    </svg>
                  )}
                  {event.iconType === "person" && (
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="14" r="7" fill="rgba(255,255,255,0.4)" />
                      <ellipse cx="20" cy="33" rx="12" ry="8" fill="rgba(255,255,255,0.3)" />
                    </svg>
                  )}
                  {event.iconType === "walking" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="13" cy="4" r="2" fill="#555" stroke="none" />
                      <path d="M10 10l1.5-1 2.5 1.5 1 4.5-3 2v4" />
                      <path d="M7 21l3-7" />
                      <path d="M10 10L7 13.5" />
                    </svg>
                  )}
                  {event.iconType === "bathroom" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="4" r="2" fill="#555" stroke="none" />
                      <path d="M12 6v4" />
                      <path d="M8 10h8" />
                      <path d="M9 10v5a3 3 0 003 3v0a3 3 0 003-3v-5" />
                    </svg>
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 13,
                      fontWeight: 650,
                      color: "#1A1A1A",
                    }}>{event.name}</span>
                    {event.tag && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#E53935",
                        background: "#FFF3F0",
                        padding: "2px 7px",
                        borderRadius: 4,
                      }}>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="#E53935">
                          <path d="M5 0L0 10h10L5 0z" />
                        </svg>
                        {event.tag}
                      </span>
                    )}
                  </div>
                  {event.subtitle && (
                    <p style={{
                      fontSize: 11,
                      color: "#888",
                      margin: "1px 0 0 0",
                      fontWeight: 400,
                    }}>{event.subtitle}</p>
                  )}
                </div>

                {/* Time */}
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: event.timeColor,
                  flexShrink: 0,
                }}>{event.time}</span>
              </div>

              {/* Divider */}
              {i < events.length - 1 && (
                <div style={{ height: 1, background: "#F0F0F0", margin: "0 20px 0 70px" }} />
              )}
            </div>
          ))}
        </div>

        {/* FAB */}
        <div style={{
          position: "absolute",
          bottom: 70,
          right: 22,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2B7A6B, #1F6B5E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(30,90,75,0.4)",
          cursor: "pointer",
          zIndex: 10,
        }}>
          <EditIcon />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "6px 8px 20px",
          background: "linear-gradient(135deg, #1B5E50, #2A7568)",
          flexShrink: 0,
          borderTop: "none",
        }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "4px 8px",
                color: item.active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                minWidth: 44,
              }}
            >
              <div style={{ opacity: item.active ? 1 : 0.5 }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 9,
                fontWeight: item.active ? 600 : 400,
                color: item.active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute",
          bottom: 6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 100,
          height: 4,
          borderRadius: 2,
          background: "#FFFFFF",
          opacity: 0.3,
        }} />
      </div>
    </>
  );
}
