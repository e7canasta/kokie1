import {SearchIcon} from "../../icons/SearchIcon.jsx";

export function SearchBar(props) {
    return <>
        {/* Search Bar */}
        <div style={{padding: "8px 16px 10px"}}>
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
                <SearchIcon/>
                <input
                    type="text"
                    placeholder="Resident Search"
                    value={props.value}
                    onChange={props.onChange}
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
    </>;
}