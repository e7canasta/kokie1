// Generate a unique room scene using CSS for each camera
export const scenes = {
    sitting: (
        <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
            {/* Dark room base */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg, #1a2a1f 0%, #0d1a14 40%, #162218 100%)"
            }}/>
            {/* Floor */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "45%",
                background: "linear-gradient(180deg, #2a3d30 0%, #3a5040 50%, #4a5d4a 100%)",
                transform: "perspective(200px) rotateX(5deg)",
                transformOrigin: "bottom"
            }}/>
            {/* Carpet / rug area */}
            <div style={{
                position: "absolute",
                bottom: "8%",
                left: "15%",
                width: "60%",
                height: "25%",
                background: "linear-gradient(135deg, #5a7a6a, #4a6858)",
                borderRadius: 4,
                opacity: 0.6,
                transform: "perspective(300px) rotateX(15deg)"
            }}/>
            {/* Bed / furniture - left */}
            <div style={{
                position: "absolute",
                bottom: "20%",
                left: "5%",
                width: "35%",
                height: "35%",
                background: "linear-gradient(135deg, #6a8a7a, #8ab0a0)",
                borderRadius: "4px 4px 0 0",
                opacity: 0.7
            }}/>
            {/* Blanket texture */}
            <div style={{
                position: "absolute",
                bottom: "25%",
                left: "7%",
                width: "30%",
                height: "18%",
                background: "linear-gradient(90deg, #9ac0b0, #7aa898, #9ac0b0)",
                borderRadius: 3,
                opacity: 0.5
            }}/>
            {/* Dresser - right */}
            <div style={{
                position: "absolute",
                bottom: "30%",
                right: "8%",
                width: "25%",
                height: "40%",
                background: "linear-gradient(180deg, #8a6a3a, #6a4a20)",
                borderRadius: "3px 3px 0 0"
            }}/>
            {/* Dresser drawers */}
            <div style={{
                position: "absolute",
                bottom: "35%",
                right: "10%",
                width: "21%",
                height: "3%",
                background: "#5a3a10",
                borderRadius: 1
            }}/>
            <div style={{
                position: "absolute",
                bottom: "42%",
                right: "10%",
                width: "21%",
                height: "3%",
                background: "#5a3a10",
                borderRadius: 1
            }}/>
            <div style={{
                position: "absolute",
                bottom: "49%",
                right: "10%",
                width: "21%",
                height: "3%",
                background: "#5a3a10",
                borderRadius: 1
            }}/>
            {/* Items on dresser */}
            <div style={{
                position: "absolute",
                bottom: "55%",
                right: "12%",
                width: "8%",
                height: "8%",
                background: "#c04020",
                borderRadius: 2,
                opacity: 0.8
            }}/>
            <div style={{
                position: "absolute",
                bottom: "56%",
                right: "22%",
                width: "5%",
                height: "6%",
                background: "#e0a040",
                borderRadius: "50%",
                opacity: 0.7
            }}/>
            {/* Wall detail - window light */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "40%",
                width: "20%",
                height: "30%",
                background: "radial-gradient(ellipse, rgba(100,140,120,0.3), transparent)",
                borderRadius: "50%"
            }}/>
            {/* Camera fisheye vignette */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)"
            }}/>
        </div>
    ),
    bedside: (
        <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
            {/* Room base */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(150deg, #d0c8b8 0%, #b8b0a0 30%, #a8a090 100%)"
            }}/>
            {/* Floor - wood */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(180deg, #b8a078 0%, #c8a878 50%, #d0b888 100%)",
                transform: "perspective(200px) rotateX(5deg)",
                transformOrigin: "bottom"
            }}/>
            {/* Floor planks */}
            {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                    position: "absolute",
                    bottom: `${i * 10}%`,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(150,120,80,0.3)"
                }}/>
            ))}
            {/* Bed frame */}
            <div style={{
                position: "absolute",
                bottom: "15%",
                left: "20%",
                width: "55%",
                height: "45%",
                background: "linear-gradient(135deg, #e8e0d8, #d0c8c0)",
                borderRadius: 4,
                border: "2px solid #c0b8a8"
            }}/>
            {/* Mattress/sheets */}
            <div style={{
                position: "absolute",
                bottom: "20%",
                left: "22%",
                width: "51%",
                height: "30%",
                background: "linear-gradient(90deg, #e8f0f0, #d0e0e8, #c0d8e0)",
                borderRadius: 3
            }}/>
            {/* Pillow */}
            <div style={{
                position: "absolute",
                bottom: "40%",
                left: "24%",
                width: "18%",
                height: "10%",
                background: "#f0f0e8",
                borderRadius: 8,
                opacity: 0.9
            }}/>
            {/* Blue item on bed */}
            <div style={{
                position: "absolute",
                bottom: "25%",
                right: "25%",
                width: "12%",
                height: "8%",
                background: "#4090c0",
                borderRadius: 3,
                opacity: 0.8
            }}/>
            {/* Wall art/frame */}
            <div style={{
                position: "absolute",
                top: "12%",
                right: "20%",
                width: "22%",
                height: "18%",
                background: "#2a2a3a",
                borderRadius: 2,
                border: "2px solid #888"
            }}/>
            <div style={{
                position: "absolute",
                top: "14%",
                right: "21%",
                width: "18%",
                height: "13%",
                background: "linear-gradient(135deg, #5a6a8a, #3a4a6a)",
                borderRadius: 1
            }}/>
            {/* Nightstand */}
            <div style={{
                position: "absolute",
                bottom: "25%",
                left: "5%",
                width: "14%",
                height: "25%",
                background: "linear-gradient(180deg, #b0a080, #907850)",
                borderRadius: 2
            }}/>
            {/* Lamp glow */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "6%",
                width: "12%",
                height: "12%",
                background: "radial-gradient(ellipse, rgba(255,200,100,0.4), transparent)",
                borderRadius: "50%"
            }}/>
            {/* Camera vignette */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)"
            }}/>
        </div>
    ),
    hallway: (
        <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
            {/* Hallway base - lighter */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg, #d8d0c0 0%, #c8c0b0 40%, #b8b0a0 100%)"
            }}/>
            {/* Floor */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "35%",
                background: "linear-gradient(180deg, #c0b898 0%, #b0a888 50%, #a89870 100%)",
                transform: "perspective(200px) rotateX(3deg)",
                transformOrigin: "bottom"
            }}/>
            {/* Hallway perspective - left wall */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "30%",
                height: "65%",
                background: "linear-gradient(90deg, #e0d8c8, #d0c8b8)",
                borderRight: "1px solid #c0b8a0"
            }}/>
            {/* Door frame */}
            <div style={{
                position: "absolute",
                top: "8%",
                left: "35%",
                width: "28%",
                height: "58%",
                background: "linear-gradient(180deg, #302820, #201810)",
                borderRadius: "2px 2px 0 0",
                border: "3px solid #c0b090"
            }}/>
            {/* Door inside - dark room */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "37%",
                width: "24%",
                height: "52%",
                background: "linear-gradient(180deg, #1a1410, #0a0808)"
            }}/>
            {/* Furniture visible through door */}
            <div style={{
                position: "absolute",
                top: "30%",
                left: "40%",
                width: "15%",
                height: "20%",
                background: "#4a3a20",
                borderRadius: 2,
                opacity: 0.6
            }}/>
            {/* Right wall */}
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "30%",
                height: "65%",
                background: "linear-gradient(270deg, #e0d8c8, #d0c8b8)"
            }}/>
            {/* Baseboard */}
            <div style={{position: "absolute", bottom: "33%", left: 0, right: 0, height: "3%", background: "#d0c8b0"}}/>
            {/* Ceiling light glow */}
            <div style={{
                position: "absolute",
                top: "0%",
                left: "30%",
                width: "40%",
                height: "20%",
                background: "radial-gradient(ellipse, rgba(255,245,220,0.5), transparent)",
                borderRadius: "50%"
            }}/>
            {/* Camera vignette */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)"
            }}/>
        </div>
    ),
};