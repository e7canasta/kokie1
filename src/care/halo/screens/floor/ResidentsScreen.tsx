import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { SearchBar } from "../../components/ui/SearchBar";
import { MyResidentsSectionTitle } from "../../components/ui/titles/MyResidentsSectionTitle";
import { RoundingButton } from "../../components/ui/RoundingButton";
import { ResidentsGrid } from "../../components/residents/grid/ResidentsGrid";
import { ResidentCardEnhanced } from "../../components/residents/ResidentCardEnhanced";
import { AllResidentsSectionTitle } from "../../components/ui/titles/AllResidentsSectionTitle";
import { ResidentsList } from "../../components/residents/list/ResidentsList";
import { ResidentsListItem } from "../../components/residents/list/ResidentsListItem";
import { BottomNavigationEnhanced } from "../../components/navigation/BottomNavigationEnhanced";
import { HomeIndicator } from "../../components/navigation/HomeIndicator";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PullToRefresh } from "../../components/ui/PullToRefresh";
import { theme } from "../../design-system";
import type { Resident } from "../../types/resident.types";

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { residents, myResidents, isLoading, isError, error, refetch } = useResidents(search);
  const setSelectedResidentId = useAppStore((s) => s.setSelectedResidentId);

  const handleResidentClick = (id: number): void => {
    setSelectedResidentId(id);
    navigate(`/resident/${id}`);
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState fullScreen message="Loading residents..." />
      </ScreenLayout>
    );
  }

  if (isError) {
    return (
      <ScreenLayout>
        <ErrorState
          fullScreen
          message={error?.message || "Failed to load residents"}
          onRetry={() => refetch()}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <PullToRefresh onRefresh={async () => { await refetch(); }}>
          <div style={{
            paddingBottom: theme.spacing.sm,
            boxShadow: theme.shadows["2xl"],
          }}>
            <SearchBar value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />

            <MyResidentsSectionTitle />
            <RoundingButton />
            
            {residents.length > 0 && (
                <>
                  <ResidentsGrid 
                    residents={myResidents}
                    renderItem={(resident: Resident) => (
                      <ResidentCardEnhanced
                        key={resident.id}
                        resident={resident}
                        onClick={handleResidentClick}
                      />
                    )} 
                  />

                  <AllResidentsSectionTitle />
                  <ResidentsList 
                    residents={residents.map((r): Resident => ({ ...r, starred: r.starred ?? false }))}
                    renderItem={(resident: Resident, i: number) => (
                      <div key={resident.id} onClick={() => handleResidentClick(resident.id)} style={{ cursor: "pointer" }}>
                        <ResidentsListItem resident={resident} i={i} totalResidents={residents.length} />
                      </div>
                    )} 
                  />
                </>
            )}
            
            {residents.length === 0 && search && (
              <div style={{ padding: theme.spacing.xxl, textAlign: "center", color: theme.colors.text.secondary }}>
                No residents found matching "{search}"
              </div>
            )}
          </div>
        </PullToRefresh>
      </div>

      <BottomNavigationEnhanced />
      <HomeIndicator />
    </ScreenLayout>
  );
}
