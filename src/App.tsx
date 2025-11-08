import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { AsteroidDashboard } from './pages/AsteroidDashboard';
import { EarthObservation } from './pages/EarthObservation';
import { SolarData } from './pages/SolarData';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<AsteroidDashboard />} />
          <Route path="/asteroids" element={<AsteroidDashboard />} />
          <Route path="/earth" element={<EarthObservation />} />
          <Route path="/solar" element={<SolarData />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
