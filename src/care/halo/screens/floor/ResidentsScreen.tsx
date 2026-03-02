import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { SearchBar } from "../../components/ui/SearchBar";
import { MyResidentsSectionTitle } from "../../components/ui/titles/MyResidentsSectionTitle";
import { RoundingButton } from "../../components/ui/RoundingButton";
import { ResidentsGrid } from "../../components/residents/grid/ResidentsGrid";
import { ResidentCardEnhanced } from "../../components/residents/ResidentCardEnhanced";
import { RoomCard } from "../../components/residents/RoomCard";
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

  const { residents, myResidents, roomGroups, isLoading, isError, error, refetch } = useResidents(search);
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
          <div style={{ paddingBottom: theme.spacing.md }}>
            <SearchBar value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />

            <MyResidentsSectionTitle />
            <RoundingButton />

            {myResidents.length > 0 && (
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
            )}

            {/* Rooms section */}
            {roomGroups.length > 0 && (
              <div style={{ padding: `6px ${theme.spacing.md} 0` }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    padding: "8px 2px 10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      letterSpacing: theme.typography.letterSpacing.tight,
                    }}
                  >
                    Rooms
                  </span>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {residents.length} residents · {roomGroups.length} rooms
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {roomGroups.map((group) => (
                    <RoomCard
                      key={group.room}
                      group={group}
                      onResidentClick={handleResidentClick}
                    />
                  ))}
                </div>
              </div>
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
