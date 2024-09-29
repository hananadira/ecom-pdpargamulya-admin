import { Routes, Route } from "react-router-dom";
import Pembelian from '../views/Pembelian/Pembelian.jsx';
import PembelianCreate from '../views/Pembelian/Create.jsx';
import PembelianEdit from '../views/Pembelian/Edit.jsx';
import PembelianDetail from '../views/Pembelian/Detail.jsx';

function PembelianRoutes() {
    return (
        <Routes>
            <Route path="/pembelian" element={<Pembelian />} />
            <Route path="/pembelian/create" element={<PembelianCreate />} />
            <Route path="/pembelian/edit/:id" element={<PembelianEdit />} />
            <Route path="/pembelian/detail/:id" element={<PembelianDetail />} />
        </Routes>
    );
}

export default PembelianRoutes;
