import {Avatar} from "../../ui/Avatar.jsx";

export function ResidentCard(props) {
    return <div

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
        <Avatar name={props.resident.name} size={34} colors={props.resident.colors}/>
        <div style={{minWidth: 0}}>
                  <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      display: "block",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                  }}>{props.resident.name}</span>
            <span style={{
                fontSize: 9.5,
                color: "#888",
                fontWeight: 400,
                display: "block",
                marginTop: 1,
            }}>{props.resident.room}</span>
        </div>
    </div>;
}