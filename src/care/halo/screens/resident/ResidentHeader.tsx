import {ChevronLeftIcon} from "../../icons/ChevronLeftIcon";
import {StarIcon} from "../../icons/StarIcon";
import type { ResidentHeaderProps } from "../../types/resident.types";

export function ResidentHeader({resident, onBack}: ResidentHeaderProps) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            gap: 12,
        }}>
            <button
                onClick={onBack}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ChevronLeftIcon/>
            </button>

            <Avatar avatarGradient={resident.avatarGradient} showBadge/>

            <div style={{flex: 1}}>
                <h1 style={{
                    fontSize: 22, // Aumentado de 20px a 22px
                    fontWeight: 700,
                    color: "#1A1A1A",
                    margin: 0,
                    lineHeight: 1.3, // Mejor spacing
                    letterSpacing: "-0.02em",
                }}>{resident.name}</h1>
                <p style={{
                    fontSize: 14, // Aumentado de 13px a 14px
                    color: "#666",
                    margin: "4px 0 0 0", // Más espacio
                    lineHeight: 1.4,
                    fontWeight: 500,
                }}>DOB: {resident.dob}</p>
                <p style={{
                    fontSize: 14, // Aumentado de 13px a 14px
                    color: "#666",
                    margin: "2px 0 0 0",
                    lineHeight: 1.4,
                    fontWeight: 500,
                }}>Room {resident.room} | Unit: {resident.unit}</p>
            </div>

            <div style={{flexShrink: 0, paddingTop: 2}}>
                <StarIcon/>
            </div>
        </div>
    );
}

interface AvatarProps {
    avatarGradient: string;
    showBadge: boolean;
}

function Avatar({avatarGradient, showBadge}: AvatarProps) {
    return (
        <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: avatarGradient,
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
        }}>
            <div style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #3E8E7E 0%, #2E6B5E 50%, #1B4A40 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="8" fill="rgba(255,255,255,0.3)"/>
                    <ellipse cx="20" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.2)"/>
                </svg>
            </div>
            {showBadge && (
                <div style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#4DB6AC",
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                        <rect x="1" y="3" width="8" height="1.5" rx="0.5"/>
                        <rect x="1" y="5.5" width="5" height="1.5" rx="0.5"/>
                    </svg>
                </div>
            )}
        </div>
    );
}
