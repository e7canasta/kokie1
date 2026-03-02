import {useState} from "react";

import {SearchBar} from "../../components/ui/SearchBar.jsx";
import {MyResidentsSectionTitle} from "../../components/ui/titles/MyResidentsSectionTitle.jsx";
import {RoundingButton} from "../../components/ui/RoundingButton.jsx";
import {ResidentsGrid} from "../../components/residents/grid/ResidentsGrid.jsx";
import {ResidentCard} from "../../components/residents/grid/ResidentCard.jsx";
import {AllResidentsSectionTitle} from "../../components/ui/titles/AllResidentsSectionTitle.jsx";
import {ResidentsList} from "../../components/residents/list/ResidentsList.jsx";
import {ResidentsListItem} from "../../components/residents/list/ResidentsListItem.jsx";
import {BottomNavigation} from "../../components/navigation/BottomNavigation.jsx";
import {HomeIndicator} from "../../components/navigation/HomeIndicator.jsx";

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");
;

  return (
    <>
      {/* Phone Frame */}
      <div style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#F6F5F3",
        overflow: "hidden",
        boxShadow: "0 30px 90px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.12)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 10,
        }}>

          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}/>

          <MyResidentsSectionTitle/>
          <RoundingButton/>
          <ResidentsGrid callbackfn={(resident) => (
              <ResidentCard key={resident.name} resident={resident}/>
          )}/>

          <AllResidentsSectionTitle/>
          <ResidentsList prop={(resident, i) => (
              <ResidentsListItem key={`${resident.name}-${i}`} resident={resident} i={i}/>
          )}/>

        </div>

        <BottomNavigation/>
        <HomeIndicator/>
      </div>
    </>
  );
}
