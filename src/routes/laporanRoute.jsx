import { Routes, Route } from "react-router-dom";
import Laporan from '../views/Laporan/Laporan.jsx';
import LaporanCreate from '../views/Laporan/Create.jsx';
import LaporanEdit from '../views/Laporan/Edit.jsx';
import LaporanDetail from '../views/Laporan/Detail.jsx';

function laporanRoute() {
    return (
        <Routes>
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/laporan/create" element={<LaporanCreate />} />
            <Route path="/laporan/edit/:id" element={<LaporanEdit />} />
            <Route path="/laporan/detail/:id" element={<LaporanDetail />} />
        </Routes>
    );
}

export default laporanRoute;
