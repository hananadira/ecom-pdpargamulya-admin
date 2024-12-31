// dashboardRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from '../views/Home';   

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default DashboardRoutes;
