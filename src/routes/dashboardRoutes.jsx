import { Routes, Route } from "react-router-dom";
import Home from '../views/Home.jsx';

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default DashboardRoutes;
