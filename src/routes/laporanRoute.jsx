import React from 'react';
import { Routes, Route } from "react-router-dom";
import Laporan from '../views/Laporan/Laporan.jsx';
import LaporanKonfirmasi from '../views/Laporan/LaporanSetuju.jsx';
import LaporanBatalkan from '../views/Laporan/LaporanTolak.jsx';
// import LaporanDetail from '../views/Laporan/Detail.jsx';

function LaporanRoutes() {
    return (
        <Routes>
            <Route index element={<Laporan />} />  {/* Rute default ke Laporan */}
            <Route path="konfirmasi" element={<LaporanKonfirmasi />} />
            <Route path="batalkan" element={<LaporanBatalkan />} />
            {/* <Route path="detail/:id" element={<LaporanDetail />} /> */}
        </Routes>
    );
}

export default LaporanRoutes;
