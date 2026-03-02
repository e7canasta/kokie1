import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResidentsScreen from './care/halo/screens/floor/ResidentsScreen';
import ResidentOverviewScreen from './care/halo/screens/resident/ResidentOverviewScreen';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResidentsScreen />} />
          <Route path="/resident/:id" element={<ResidentOverviewScreen />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
