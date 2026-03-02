import { useState } from "react";

const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchNavIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ResidentsNavIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const MenuNavIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const StarFilled = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2E9E8F" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarOutline = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Avatar component with unique colors per person
const Avatar = ({ name, size = 42, colors }) => {
  const initials = name.split(" ").map(n => n[0]).join("");
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: `2px solid ${colors[2] || "rgba(255,255,255,0.3)"}`,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Simulated photo feel */}
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="7" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="20" cy="34" rx="13" ry="9" fill="rgba(255,255,255,0.25)" />
        </svg>
      </div>
    </div>
  );
};

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");

  const myResidents = [
    { name: "Marce Brown", room: "Room 201 | AL", colors: ["#8B4A5E", "#A0586A", "#D4A0B0"] },
    { name: "Theodore Brown", room: "Room 201 | AL", colors: ["#7A8A6A", "#6A7A5A", "#B0C0A0"] },
    { name: "Oscar Garcia", room: "Room 204 | AL", colors: ["#8A7A6A", "#7A6A5A", "#C0B0A0"] },
    { name: "Linda Scocia", room: "Room 207 | AL", colors: ["#6A7A8A", "#5A6A7A", "#A0B0C0"] },
  ];

  const allResidents = [
    { name: "Marce Brown", room: "Room 201", starred: true, colors: ["#8B4A5E", "#A0586A", "#D4A0B0"] },
    { name: "Theodore Brown", room: "Room 201", starred: true, colors: ["#7A8A6A", "#6A7A5A", "#B0C0A0"] },
    { name: "Robert Chen", room: "Room 203", starred: false, colors: ["#2E7D6F", "#1B5E50", "#80C0B0"] },
    { name: "Linda Cooper", room: "Room 103", starred: false, colors: ["#6A5A8A", "#5A4A7A", "#B0A0C0"] },
    { name: "Oscar Garcia", room: "Room 204", starred: true, colors: ["#8A7A6A", "#7A6A5A", "#C0B0A0"] },
    { name: "Rose Williams", room: "Room 105", starred: false, colors: ["#8A5A5A", "#7A4A4A", "#C0A0A0"] },
  ];

  const navItems = [
    { icon: <HomeIcon />, label: "Events", active: false },
    { icon: <SearchNavIcon />, label: "Discover", active: false },
    { icon: <ResidentsNavIcon />, label: "Residents", active: true },
    { icon: <MenuNavIcon />, label: "Menu", active: false },
    { icon: <EditIcon />, label: null, isFab: true },
  ];

  return (
    <>
      {/* Phone Frame */}
      <div style={{
        width: "100vw",
        minHeight: "100vh",
        height: 640,
        background: "#F6F5F3",
        overflow: "hidden",
        boxShadow: "0 30px 90px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.12)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 10,
        }}>

          {/* Search Bar */}
          <div style={{ padding: "8px 16px 10px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              background: "#FFFFFF",
              borderRadius: 26,
              border: "1px solid #E0E0E0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Resident Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: "#333",
                  background: "transparent",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* My Residents Section */}
          <div style={{ padding: "4px 18px 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A1A1A" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 750, color: "#1A1A1A" }}>My Residents</span>
            </div>
          </div>

          {/* START ROUNDING Button */}
          <div style={{ padding: "0 16px 10px" }}>
            <button style={{
              width: "100%",
              padding: "12px 0",
              background: "linear-gradient(135deg, #1A6356, #257D6E)",
              color: "white",
              border: "none",
              borderRadius: 26,
              fontSize: 12.5,
              fontWeight: 750,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              letterSpacing: "1px",
              boxShadow: "0 4px 14px rgba(26,99,86,0.3)",
            }}>
              <ExternalLinkIcon />
              START ROUNDING
            </button>
          </div>

          {/* My Residents Grid - 2x2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            padding: "0 16px 16px",
          }}>
            {myResidents.map((resident) => (
              <div
                key={resident.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 10px",
                  background: "#FFFFFF",
                  borderRadius: 12,
                  border: "1px solid #E8E4DE",
                  cursor: "pointer",
                }}
              >
                <Avatar name={resident.name} size={34} colors={resident.colors} />
                <div style={{ minWidth: 0 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    display: "block",
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>{resident.name}</span>
                  <span style={{
                    fontSize: 9.5,
                    color: "#888",
                    fontWeight: 400,
                    display: "block",
                    marginTop: 1,
                  }}>{resident.room}</span>
                </div>
              </div>
            ))}
          </div>

          {/* All Residents Section */}
          <div style={{ padding: "4px 18px 8px" }}>
            <span style={{ fontSize: 14, fontWeight: 750, color: "#1A1A1A" }}>All Residents</span>
          </div>

          {/* All Residents List */}
          <div style={{ background: "#FFFFFF", margin: "0 0px" }}>
            {allResidents.map((resident, i) => (
              <div key={`${resident.name}-${i}`}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 18px",
                  gap: 0,
                  cursor: "pointer",
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      display: "block",
                      lineHeight: 1.2,
                    }}>{resident.name}</span>
                    <span style={{
                      fontSize: 11.5,
                      color: "#888",
                      fontWeight: 400,
                      display: "block",
                      marginTop: 2,
                    }}>{resident.room}</span>
                  </div>
                  <div style={{ flexShrink: 0, cursor: "pointer" }}>
                    {resident.starred ? <StarFilled /> : <StarOutline />}
                  </div>
                </div>
                {i < allResidents.length - 1 && (
                  <div style={{ height: 1, background: "#F0EFED", margin: "0 18px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          padding: "0 6px 16px",
          background: "linear-gradient(135deg, #1B5E50, #2A7568)",
          flexShrink: 0,
          height: 56,
          position: "relative",
        }}>
          {/* Events */}
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            padding: "6px 6px 0",
            color: "rgba(255,255,255,0.45)",
            minWidth: 48,
          }}>
            <HomeIcon />
            <span style={{ fontSize: 9, fontWeight: 400 }}>Events</span>
          </button>

          {/* Discover */}
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            padding: "6px 6px 0",
            color: "rgba(255,255,255,0.45)",
            minWidth: 48,
          }}>
            <SearchNavIcon />
            <span style={{ fontSize: 9, fontWeight: 400 }}>Discover</span>
          </button>

          {/* Residents - Active with highlight */}
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            padding: "6px 6px 0",
            color: "#FFFFFF",
            minWidth: 48,
            position: "relative",
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: -4,
            }}>
              <ResidentsNavIcon />
            </div>
            <div style={{ height: 26 }} />
            <span style={{ fontSize: 9, fontWeight: 600 }}>Residents</span>
          </button>

          {/* Menu */}
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            padding: "6px 6px 0",
            color: "rgba(255,255,255,0.45)",
            minWidth: 48,
          }}>
            <MenuNavIcon />
            <span style={{ fontSize: 9, fontWeight: 400 }}>Menu</span>
          </button>

          {/* FAB - Edit */}
          <button style={{
            background: "linear-gradient(135deg, #2B7A6B, #1F6B5E)",
            border: "3px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            padding: 0,
            marginBottom: 4,
          }}>
            <EditIcon />
          </button>
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
          opacity: 0.25,
        }} />
      </div>
    </>
  );
}
