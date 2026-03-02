import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { SearchBar } from "../../components/ui/SearchBar";
import { MyResidentsSectionTitle } from "../../components/ui/titles/MyResidentsSectionTitle";
import { RoundingButton } from "../../components/ui/RoundingButton";
import { FavoriteResidentSlider } from "../../components/residents/FavoriteResidentSlider";
import { RoomCard } from "../../components/residents/RoomCard";
import { BottomNavigationEnhanced } from "../../components/navigation/BottomNavigationEnhanced";
import { HomeIndicator } from "../../components/navigation/HomeIndicator";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PullToRefresh } from "../../components/ui/PullToRefresh";
import { theme } from "../../design-system";

const CURRENT_UNIT = "2nd Floor · Memory Care & AL";

export default function ResidentsScreen() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { residents, myResidents, roomGroups, isLoading, isError, error, refetch } = useResidents(search);
  const setSelectedResidentId = useAppStore((s) => s.setSelectedResidentId);
  const totalAlerts = residents.filter((r) => r.wellness?.trend === "Low").length;

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
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <PullToRefresh onRefresh={async () => { await refetch(); }}>
          <div style={{ paddingBottom: theme.spacing.md, maxWidth: "100%" }}>

            {/* Unit/Floor context bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px 4px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    letterSpacing: theme.typography.letterSpacing.tight,
                  }}
                >
                  {CURRENT_UNIT}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  {residents.length}
                </span>
                {totalAlerts > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.inverse,
                      background: theme.colors.error,
                      borderRadius: theme.borderRadius.full,
                      padding: "2px 7px",
                      lineHeight: "1.4",
                    }}
                  >
                    {totalAlerts}
                  </span>
                )}
              </div>
            </div>

            <SearchBar value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />

            <MyResidentsSectionTitle />
            <RoundingButton />

            {myResidents.length > 0 && (
              <FavoriteResidentSlider
                residents={myResidents}
                onResidentClick={handleResidentClick}
              />
            )}

            {/* Rooms */}
            {roomGroups.length > 0 && (
              <div style={{ padding: `4px ${theme.spacing.md} 0` }}>
                <div
                  style={{
                    padding: "6px 2px 8px",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
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
                      fontSize: 11,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {roomGroups.length} rooms
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
