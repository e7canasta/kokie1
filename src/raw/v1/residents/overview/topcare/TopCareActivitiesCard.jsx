import {careActivities} from "./data.js";
import {Tabs} from "./Tabs.jsx";
import {TableHeader} from "./TableHeader.jsx";
import {MoreButton} from "./MoreButton.jsx";
import {CardTitle} from "./CardTitle.jsx";

export function TopCareActivitiesCard(props) {
    return <>
        {/* Top Care Activities */}
        <div style={{padding: "24px 20px 0"}}>
            <CardTitle/>

            <Tabs strings={props.strings} callbackfn={props.callbackfn}/>

            <TableHeader/>

            {/* Divider */}
            <div style={{height: 1, background: "#ECECEC"}}/>

            {/* Table Rows */}
            {careActivities.map(props.callbackfn1)}

            <MoreButton/>
        </div>
    </>;
}