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

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E7D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 16 10" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

export default function EventsScreenWithAlert() {
  const [showAlert, setShowAlert] = useState(true);

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
      name: "Ashlynn P.",
      subtitle: "2nd Floor West Wing",
      tag: null,
      time: "8m 15s",
      timeColor: "#333",
      iconType: "walking",
    },
    {
      id: 3,
      name: "Room 101",
      subtitle: "Bathroom",
      tag: null,
      time: "3m 26s",
      timeColor: "#333",
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
          background: "#FFFFFF",
          zIndex: 5,
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

          {/* Welcome Header - White background like screenshot */}
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
              }}>
                Welcome, Carla.
              </h1>
              <p style={{
                fontSize: 12.5,
                color: "#555",
                margin: "4px 0 0 0",
                fontWeight: 400,
              }}>
                You've completed <span style={{ color: "#2E7D6F", fontWeight: 700 }}>8 events</span> today.
              </p>
            </div>
            {/* Profile Avatar */}
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

          {/* ===== CLAIMED EVENT ALERT CARD ===== */}
          {showAlert && (
            <div style={{
              margin: "0 14px 4px",
              background: "linear-gradient(145deg, #1A6356, #257D6E, #1A6356)",
              borderRadius: 14,
              padding: "14px 16px 14px",
              position: "relative",
              boxShadow: "0 6px 20px rgba(26,99,86,0.35)",
              overflow: "hidden",
            }}>
              {/* Subtle pattern overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
                pointerEvents: "none",
              }} />

              {/* Top Row: Icon + Info + Time */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                position: "relative",
                zIndex: 1,
              }}>
                {/* Clipboard Icon */}
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.08)",
                }}>
                  <ClipboardIcon />
                </div>

                {/* Name & Location */}
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    display: "block",
                    lineHeight: 1.2,
                  }}>Robert C.</span>
                  <span style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 400,
                    display: "block",
                    marginTop: 2,
                  }}>2nd Floor East Wing</span>
                </div>

                {/* Time */}
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  flexShrink: 0,
                }}>8m 47s</span>
              </div>

              {/* Subtle separator line */}
              <div style={{
                height: 1,
                background: "rgba(255,255,255,0.12)",
                margin: "0 0 12px 0",
                position: "relative",
                zIndex: 1,
              }} />

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                gap: 10,
                position: "relative",
                zIndex: 1,
              }}>
                {/* VIEW ROOM Button */}
                <button
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "rgba(255,255,255,0.12)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: 24,
                    color: "#FFFFFF",
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    letterSpacing: "0.8px",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.12)"}
                >
                  <ExternalLinkIcon />
                  VIEW ROOM
                </button>

                {/* COMPLETE Button */}
                <button
                  onClick={() => setShowAlert(false)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: 24,
                    color: "#1A6356",
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    letterSpacing: "0.8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#F0FAF7"}
                  onMouseLeave={(e) => e.target.style.background = "#FFFFFF"}
                >
                  <CheckCircleIcon />
                  COMPLETE
                </button>
              </div>
            </div>
          )}

          {/* Not Claimed Section Header */}
          <div style={{
            padding: "14px 20px 8px",
          }}>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#555",
              letterSpacing: "-0.1px",
            }}>Not Claimed ({events.length})</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ECECEC", margin: "0 20px" }} />

          {/* Event List */}
          <div style={{ background: "#FFFFFF" }}>
            {events.map((event, i) => (
              <div key={event.id}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  gap: 12,
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#F0F0F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1.5px solid #E0E0E0",
                  }}>
                    {event.iconType === "fall" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="14" cy="4" r="2" fill="#555" stroke="none" />
                        <path d="M7 22l3-8 3 1v-6l3-2" />
                        <path d="M13 9l4 3" />
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
                        fontWeight: 700,
                        color: "#1A1A1A",
                      }}>{event.name}</span>
                    </div>
                    {event.tag && (
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 2,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="#E53935">
                          <path d="M6 1L1 11h10L6 1z" />
                        </svg>
                        <span style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: "#E53935",
                        }}>Fall</span>
                      </div>
                    )}
                    {event.subtitle && (
                      <p style={{
                        fontSize: 11,
                        color: "#888",
                        margin: "2px 0 0 0",
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

                {i < events.length - 1 && (
                  <div style={{ height: 1, background: "#F0F0F0", margin: "0 20px 0 70px" }} />
                )}
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />
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
              <div style={{ opacity: item.active ? 1 : 0.5, color: item.active ? "#FFFFFF" : "rgba(255,255,255,0.5)" }}>
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
