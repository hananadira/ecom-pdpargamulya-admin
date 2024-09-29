//import react router dom
import { Routes, Route } from "react-router-dom";

//import view posts index
import Pengiriman from '../views/Pengiriman/Pengiriman.jsx';

//import view post create
import PengirimanCreate from '../views/Pengiriman/Create.jsx';

//import view post edit
import PengirimanEdit from '../views/Pengiriman/Edit.jsx';

// import view post detail
import PengirimanDetail from '../views/Pengiriman/Detail.jsx';

function pengirimanRoutes() {
    return (
        <Routes>

            {/* route "/posts" */}
            <Route path="/posts" element={<Pengiriman />} />

            {/* route "/posts/create" */}
            <Route path="/posts/create" element={<PengirimanCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/posts/edit/:id" element={<PengirimanEdit />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/posts/detail/:id" element={<PengirimanDetail />} />

        </Routes>
    )
}

export default pengirimanRoutes