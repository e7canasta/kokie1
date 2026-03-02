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
        padding: "0 6px 14px",
        background: `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[500]})`,
        flexShrink: 0,
        height: 60,
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
              gap: 2,
              padding: "6px 10px 0",
              color: isActive ? theme.colors.text.inverse : "rgba(255,255,255,0.5)",
              minWidth: 52,
              position: "relative",
              transform: isPressed ? "scale(0.9)" : "scale(1)",
              transition: `all ${theme.transitions.fast}`,
            }}
          >
            {isActive && (
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: theme.borderRadius.full,
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
            <div style={{ height: isActive ? 28 : 0, transition: `height ${theme.transitions.normal}` }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive
                  ? theme.typography.fontWeight.semibold
                  : theme.typography.fontWeight.normal,
                transition: `font-weight ${theme.transitions.normal}`,
                letterSpacing: theme.typography.letterSpacing.wide,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* FAB */}
      <button
        onClick={() => {
          // TODO: Implementar acción rápida
          console.log("Quick action");
        }}
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.primary[600]})`,
          border: "3px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: theme.borderRadius.full,
          color: theme.colors.text.inverse,
          boxShadow: theme.shadows.lg,
          padding: 0,
          marginBottom: 2,
          transform: pressedButton === "fab" ? "scale(0.9)" : "scale(1)",
          transition: `transform ${theme.transitions.fast}`,
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
