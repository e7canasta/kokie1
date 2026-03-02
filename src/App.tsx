import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { RoundingProvider } from './care/halo/context/RoundingContext';
import { ErrorBoundary } from './care/halo/components/ui/ErrorBoundary';
import { PageTransition } from './care/halo/components/navigation/PageTransition';
import ResidentsScreen from './care/halo/screens/floor/ResidentsScreen';
import ResidentOverviewScreen from './care/halo/screens/resident/ResidentOverviewScreen';
import CareActivitiesScreen from './care/halo/screens/resident/CareActivitiesScreen';
import RoomDetailScreen from './care/halo/screens/room/RoomDetailScreen';
import { queryClient } from './config/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoundingProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route element={<PageTransition><Outlet /></PageTransition>}>
                <Route path="/" element={<ResidentsScreen />} />
                <Route path="/room/:roomId" element={<RoomDetailScreen />} />
                <Route path="/resident/:id" element={<ResidentOverviewScreen />} />
                <Route path="/resident/:id/care-activities" element={<CareActivitiesScreen />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </RoundingProvider>
    </QueryClientProvider>
  );
}

export default App;
