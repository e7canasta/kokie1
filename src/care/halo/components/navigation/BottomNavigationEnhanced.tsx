/**
 * Enhanced Bottom Navigation
 * Navegación mejorada con animaciones y feedback táctil
 */

import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../icons/HomeIcon";
import { SearchNavIcon } from "../../icons/SearchNavIcon";
import { ResidentsNavIcon } from "../../icons/ResidentsNavIcon";
import { MenuNavIcon } from "../../icons/MenuNavIcon";
import { EditIcon } from "../../icons/EditIcon";
import { theme } from "../../design-system";
import { useState } from "react";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ active?: boolean }>;
  label: string;
  path: string;
  isActive?: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    id: "events",
    icon: HomeIcon,
    label: "Events",
    path: "/events",
    isActive: (path) => path === "/events",
  },
  {
    id: "discover",
    icon: SearchNavIcon,
    label: "Discover",
    path: "/discover",
    isActive: (path) => path === "/discover",
  },
  {
    id: "residents",
    icon: ResidentsNavIcon,
    label: "Residents",
    path: "/",
    isActive: (path) => path === "/" || path.startsWith("/resident"),
  },
  {
    id: "menu",
    icon: MenuNavIcon,
    label: "Menu",
    path: "/menu",
    isActive: (path) => path === "/menu",
  },
];

export function BottomNavigationEnhanced() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleNavClick = (item: NavItem) => {
    setPressedButton(item.id);
    setTimeout(() => {
      navigate(item.path);
      setPressedButton(null);
    }, 150);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        padding: "0 6px 16px",
        background: "linear-gradient(135deg, #1B5E50, #2A7568)",
        flexShrink: 0,
        height: 56,
        position: "relative",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.isActive?.(location.pathname) || false;
        const isPressed = pressedButton === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              padding: "6px 6px 0",
              color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)",
              minWidth: 48,
              position: "relative",
              transform: isPressed ? "scale(0.9)" : "scale(1)",
              transition: "all 0.15s ease-out",
            }}
          >
            {isActive && (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: -4,
                  animation: "scaleIn 0.2s ease-out",
                }}
              >
                <Icon active={isActive} />
              </div>
            )}
            {!isActive && <Icon active={isActive} />}
            <div style={{ height: isActive ? 26 : 0, transition: "height 0.2s" }} />
            <span
              style={{
                fontSize: 9,
                fontWeight: isActive ? 600 : 400,
                transition: "font-weight 0.2s",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* FAB - Quick Action */}
      <button
        onClick={() => {
          // TODO: Implementar acción rápida
          console.log("Quick action");
        }}
        style={{
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
          transform: pressedButton === "fab" ? "scale(0.9)" : "scale(1)",
          transition: "transform 0.15s ease-out",
        }}
        onMouseDown={() => setPressedButton("fab")}
        onMouseUp={() => setPressedButton(null)}
      >
        <EditIcon />
      </button>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
