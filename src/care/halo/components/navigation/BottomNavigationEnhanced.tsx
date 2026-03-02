import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../icons/HomeIcon";
import { SearchNavIcon } from "../../icons/SearchNavIcon";
import { ResidentsNavIcon } from "../../icons/ResidentsNavIcon";
import { MenuNavIcon } from "../../icons/MenuNavIcon";
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
];

export type SecondaryFabAction = "quick-note" | "alert" | "call";

interface SecondaryFabConfig {
  icon: React.ReactNode;
  label: string;
  bg: string;
}

const NoteIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const AlertIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CallIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SECONDARY_CONFIG: Record<SecondaryFabAction, SecondaryFabConfig> = {
  "quick-note": {
    icon: NoteIcon,
    label: "Note",
    bg: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.primary[600]})`,
  },
  alert: {
    icon: AlertIcon,
    label: "Alert",
    bg: `linear-gradient(135deg, ${theme.colors.warning}, #E68900)`,
  },
  call: {
    icon: CallIcon,
    label: "Call",
    bg: `linear-gradient(135deg, ${theme.colors.info}, #1976D2)`,
  },
};

interface BottomNavigationProps {
  secondaryAction?: SecondaryFabAction;
  onSecondaryAction?: () => void;
}

export function BottomNavigationEnhanced({
  secondaryAction = "quick-note",
  onSecondaryAction,
}: BottomNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const fabConfig = SECONDARY_CONFIG[secondaryAction];

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
        alignItems: "flex-end",
        padding: "0 8px 14px",
        background: `linear-gradient(135deg, ${theme.colors.primary[600]}, ${theme.colors.primary[500]})`,
        flexShrink: 0,
        height: 56,
        position: "relative",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* 3 nav items */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.isActive?.(location.pathname) || false;
        const isPressed = pressedButton === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "6px 0 0",
              color: isActive ? theme.colors.text.inverse : "rgba(255,255,255,0.5)",
              position: "relative",
              transform: isPressed ? "scale(0.9)" : "scale(1)",
              transition: `all ${theme.transitions.fast}`,
            }}
          >
            {isActive && (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: theme.borderRadius.full,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: -2,
                  animation: "scaleIn 0.2s ease-out",
                }}
              >
                <Icon active={isActive} />
              </div>
            )}
            {!isActive && <Icon active={isActive} />}
            <div style={{ height: isActive ? 22 : 0, transition: `height ${theme.transitions.normal}` }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive
                  ? theme.typography.fontWeight.semibold
                  : theme.typography.fontWeight.normal,
                letterSpacing: theme.typography.letterSpacing.wide,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Menu item */}
      <button
        onClick={() => {
          setPressedButton("menu");
          setTimeout(() => {
            navigate("/menu");
            setPressedButton(null);
          }, 150);
        }}
        style={{
          flex: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: "6px 0 0",
          color: location.pathname === "/menu" ? theme.colors.text.inverse : "rgba(255,255,255,0.5)",
          position: "relative",
          transform: pressedButton === "menu" ? "scale(0.9)" : "scale(1)",
          transition: `all ${theme.transitions.fast}`,
        }}
      >
        {location.pathname === "/menu" && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.full,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: -2,
              animation: "scaleIn 0.2s ease-out",
            }}
          >
            <MenuNavIcon />
          </div>
        )}
        {location.pathname !== "/menu" && <MenuNavIcon />}
        <div style={{ height: location.pathname === "/menu" ? 22 : 0, transition: `height ${theme.transitions.normal}` }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: location.pathname === "/menu"
              ? theme.typography.fontWeight.semibold
              : theme.typography.fontWeight.normal,
            letterSpacing: theme.typography.letterSpacing.wide,
          }}
        >
          Menu
        </span>
      </button>

      {/* Secondary contextual FAB — far right, elevated */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          paddingRight: 2,
          marginTop: -22,
        }}
      >
        <button
          onClick={onSecondaryAction}
          onMouseDown={() => setPressedButton("fab2")}
          onMouseUp={() => setPressedButton(null)}
          onTouchStart={() => setPressedButton("fab2")}
          onTouchEnd={() => setPressedButton(null)}
          style={{
            width: 48,
            height: 48,
            borderRadius: theme.borderRadius.full,
            background: fabConfig.bg,
            border: "2.5px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.colors.text.inverse,
            padding: 0,
            boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
            transform: pressedButton === "fab2" ? "scale(0.9)" : "scale(1)",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {fabConfig.icon}
        </button>
        <span
          style={{
            fontSize: 9,
            fontWeight: theme.typography.fontWeight.semibold,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.03em",
          }}
        >
          {fabConfig.label}
        </span>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
