import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

const fetchResidents = async () => {
  const res = await fetch("/api/residents");
  if (!res.ok) throw new Error("Failed to fetch residents");
  return res.json();
};

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: residents = [], isLoading, error } = useQuery({
    queryKey: ["residents"],
    queryFn: fetchResidents,
  });

  const filteredResidents = residents.filter((r: { name: string }) => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleResidentClick = (id: number) => {
    navigate(`/resident/${id}`);
  };

  return (
    <>
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
        <div style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 10,
        }}>

          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

          <MyResidentsSectionTitle />
          <RoundingButton />
          
          {isLoading && <div style={{ padding: 20 }}>Loading...</div>}
          {error && <div style={{ padding: 20, color: "red" }}>Error loading residents</div>}
          
          {!isLoading && !error && (
            <>
              <ResidentsGrid callbackfn={(resident: { id: number; name: string; room: string; image: string }) => (
                  <div key={resident.name} onClick={() => handleResidentClick(resident.id)} style={{ cursor: "pointer" }}>
                    <ResidentCard resident={resident} />
                  </div>
              )} />

              <AllResidentsSectionTitle />
              <ResidentsList prop={(resident: { id: number; name: string; room: string; age: number; image: string }, i: number) => (
                  <div key={`${resident.name}-${i}`} onClick={() => handleResidentClick(resident.id)} style={{ cursor: "pointer" }}>
                    <ResidentsListItem resident={resident} i={i} />
                  </div>
              )} />
            </>
          )}

        </div>

        <BottomNavigation />
        <HomeIndicator />
      </div>
    </>
  );
}
