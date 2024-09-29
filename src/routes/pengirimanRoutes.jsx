import { Routes, Route } from "react-router-dom";
import Pengiriman from '../views/Pengiriman/Pengiriman.jsx';
import PengirimanCreate from '../views/Pengiriman/Create.jsx';
import PengirimanEdit from '../views/Pengiriman/Edit.jsx';
import PengirimanDetail from '../views/Pengiriman/Detail.jsx';

function PengirimanRoutes() {
    return (
        <Routes>
            <Route path="/pengiriman" element={<Pengiriman />} />
            <Route path="/pengiriman/create" element={<PengirimanCreate />} />
            <Route path="/pengiriman/edit/:id" element={<PengirimanEdit />} />
            <Route path="/pengiriman/detail/:id" element={<PengirimanDetail />} />
        </Routes>
    );
}

export default PengirimanRoutes;
