import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {SearchBar} from "../../components/ui/SearchBar";
import {MyResidentsSectionTitle} from "../../components/ui/titles/MyResidentsSectionTitle";
import {RoundingButton} from "../../components/ui/RoundingButton";
import {ResidentsGrid} from "../../components/residents/grid/ResidentsGrid";
import {ResidentCard} from "../../components/residents/grid/ResidentCard";
import {AllResidentsSectionTitle} from "../../components/ui/titles/AllResidentsSectionTitle";
import {ResidentsList} from "../../components/residents/list/ResidentsList";
import {ResidentsListItem} from "../../components/residents/list/ResidentsListItem";
import {BottomNavigation} from "../../components/navigation/BottomNavigation";
import {HomeIndicator} from "../../components/navigation/HomeIndicator";
import type { Resident } from "../../types/resident.types";

const fetchResidents = async (): Promise<Resident[]> => {
  const res = await fetch("/api/residents");
  if (!res.ok) throw new Error("Failed to fetch residents");
  return res.json();
};

// Helper function to extract colors from gradient string
const extractColorsFromGradient = (gradient: string): string[] => {
  // Extract hex colors from gradient string like "linear-gradient(135deg, #2E7D6F, #1B5E50)"
  const matches = gradient.match(/#[0-9A-Fa-f]{6}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1], matches[1] + "80"]; // Add transparency to third color
  }
  return ["#8B4A5E", "#A0586A", "#D4A0B0"]; // Default fallback
};

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: residents = [], isLoading, error } = useQuery<Resident[]>({
    queryKey: ["residents"],
    queryFn: fetchResidents,
  });
  
  const filteredResidents: Resident[] = residents.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleResidentClick = (id: number): void => {
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

          <SearchBar value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />

          <MyResidentsSectionTitle />
          <RoundingButton />
          
          {isLoading && <div style={{ padding: 20 }}>Loading...</div>}
          {error && <div style={{ padding: 20, color: "red" }}>Error loading residents</div>}
          
          {!isLoading && !error && (
            <>
              <ResidentsGrid 
                residents={filteredResidents.slice(0, 4).map((r): Resident => ({
                  ...r,
                  colors: r.avatarGradient 
                    ? extractColorsFromGradient(r.avatarGradient)
                    : ["#8B4A5E", "#A0586A", "#D4A0B0"]
                }))}
                callbackfn={(resident: Resident) => (
                  <div key={resident.id} onClick={() => handleResidentClick(resident.id)} style={{ cursor: "pointer" }}>
                    <ResidentCard resident={resident} />
                  </div>
                )} 
              />

              <AllResidentsSectionTitle />
              <ResidentsList 
                residents={filteredResidents.map((r): Resident => ({
                  ...r,
                  starred: r.starred || false
                }))}
                prop={(resident: Resident, i: number) => (
                  <div key={resident.id} onClick={() => handleResidentClick(resident.id)} style={{ cursor: "pointer" }}>
                    <ResidentsListItem resident={resident} i={i} totalResidents={filteredResidents.length} />
                  </div>
                )} 
              />
            </>
          )}

        </div>

        <BottomNavigation />
        <HomeIndicator />
      </div>
    </>
  );
}
