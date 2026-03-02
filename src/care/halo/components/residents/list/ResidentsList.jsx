import {allResidents} from "../../../domain/residents.jsx";

export function ResidentsList(props) {
    return <>
        {/* All Residents List */}
        <div style={{background: "#FFFFFF", margin: "0 0px"}}>
            {allResidents.map(props.prop)}
        </div>
    </>;
}