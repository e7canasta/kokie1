import {ChevronLeftIcon} from "../../../../care/halo/icons/ChevronLeftIcon.jsx";
import {AvatarPlaceholder} from "./AvatarPlaceholder.jsx";
import {SmallIconBadge} from "./SmallIconBadge.jsx";
import {StarIcon} from "../../../../care/halo/icons/StarIcon.jsx";

export function HeaderSection() {
    return <>
        {/* Header */}
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            gap: 12,
        }}>
            <button style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "#333",
                display: "flex",
                alignItems: "center",
            }}>
                <ChevronLeftIcon/>
            </button>

            {/* Avatar */}
            <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
                overflow: "hidden",
                flexShrink: 0,
                position: "relative",
            }}>
                <AvatarPlaceholder/>
                <SmallIconBadge/>
            </div>

            {/* Name & Info */}
            <div style={{flex: 1}}>
                <h1 style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.3px",
                }}>Robert Chen</h1>
                <p style={{
                    fontSize: 13,
                    color: "#666",
                    margin: "2px 0 0 0",
                    lineHeight: 1.3,
                }}>DOB: June 3, 1943</p>
                <p style={{
                    fontSize: 13,
                    color: "#666",
                    margin: "1px 0 0 0",
                    lineHeight: 1.3,
                }}>Room 203 | Unit: Memory Care</p>
            </div>

            <div style={{flexShrink: 0, paddingTop: 2}}>
                <StarIcon/>
            </div>
        </div>
    </>;
}