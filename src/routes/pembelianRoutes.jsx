// pembelianRoutes.jsx
// import React from 'react';
import { Routes, Route } from "react-router-dom";
import Pembelian from '../views/Pembelian/Pembelian.jsx';
// import PembelianCreate from '../views/Pembelian/Create.jsx';
import PembelianEdit from '../views/Pembelian/Edit.jsx';
import PembelianDetail from '../views/Pembelian/Detail.jsx';

function PembelianRoutes() {
    return (
        <Routes>
            <Route index element={<Pembelian />} />  {/* Rute default ke Pembelian */}
            {/* <Route path="create" element={<PembelianCreate />} /> */}
            <Route path="edit/:id" element={<PembelianEdit />} />
            <Route path="detail/:id" element={<PembelianDetail />} />
        </Routes>
    );
}

export default PembelianRoutes;
