// dashboardRoutes.jsx
import { Routes, Route } from "react-router-dom";
// import Login from '../views/login';  // Sesuaikan dengan path Login Anda
import Home from '../views/Home';    // Sesuaikan dengan path Home Anda

function DashboardRoutes() {
    return (
        <Routes>
            {/* Route untuk login */}
            {/* <Route path="/login" element={<Login />} /> */}
            
            {/* Route untuk home setelah login */}
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default DashboardRoutes;
