import {HomeIcon} from "../../icons/HomeIcon.jsx";
import {SearchNavIcon} from "../../icons/SearchNavIcon.jsx";
import {ResidentsNavIcon} from "../../icons/ResidentsNavIcon.jsx";
import {MenuNavIcon} from "../../icons/MenuNavIcon.jsx";
import {EditIcon} from "../../icons/EditIcon.jsx";

export function BottomNavigation() {
    return <>
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
                <HomeIcon/>
                <span style={{fontSize: 9, fontWeight: 400}}>Events</span>
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
                <SearchNavIcon/>
                <span style={{fontSize: 9, fontWeight: 400}}>Discover</span>
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
                    <ResidentsNavIcon/>
                </div>
                <div style={{height: 26}}/>
                <span style={{fontSize: 9, fontWeight: 600}}>Residents</span>
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
                <MenuNavIcon/>
                <span style={{fontSize: 9, fontWeight: 400}}>Menu</span>
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
                <EditIcon/>
            </button>
        </div>
    </>;
}