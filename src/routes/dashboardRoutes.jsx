//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from '../views/Home.jsx';

function dashboardRoutes() {
    return (
        <Routes>

            {/* route "/" */}
            <Route path="/" element={<Home />} />

        </Routes>
    )
}

export default dashboardRoutes