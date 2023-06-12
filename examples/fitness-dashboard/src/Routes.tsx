import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stats" element={<Dashboard />} />
        <Route path="/calendar" element={<Dashboard />} />
        <Route path="/trainings" element={<Dashboard />} />
        <Route path="/measurements" element={<Dashboard />} />
        <Route path="/diet" element={<Dashboard />} />
        <Route path="/notification" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
