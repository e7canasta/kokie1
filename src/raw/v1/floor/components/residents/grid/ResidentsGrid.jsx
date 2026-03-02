import {myResidents} from "../../../data/residents.jsx";

export function ResidentsGrid(props) {
    return <>
        {/* My Residents Grid - 2x2 */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            padding: "0 16px 16px",
        }}>
            {myResidents.map(props.callbackfn)}
        </div>
    </>;
}