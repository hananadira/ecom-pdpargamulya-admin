//import react router dom
import { Routes, Route } from "react-router-dom";

//import view posts index
import Pembelian from '../views/Pembelian/Pembelian.jsx';

//import view post create
import PembelianCreate from '../views/Pembelian/Create.jsx';

//import view post edit
import PembelianEdit from '../views/Pembelian/Edit.jsx';

// import view post detail
import PembelianDetail from '../views/Pembelian/Detail.jsx';

function pembelianRoutes() {
    return (
        <Routes>

            {/* route "/posts" */}
            <Route path="/posts" element={<Pembelian />} />

            {/* route "/posts/create" */}
            <Route path="/posts/create" element={<PembelianCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/posts/edit/:id" element={<PembelianEdit />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/posts/detail/:id" element={<PembelianDetail />} />

        </Routes>
    )
}

export default pembelianRoutes