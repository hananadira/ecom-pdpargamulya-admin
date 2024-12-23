// MasterRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Master from '../views/Master/Master.jsx';
// USER
import MasterUser from '../views/Master/User/User.jsx';
import MasterUserDetail from '../views/Master/User/Detail.jsx';
import MasterUserCreate from '../views/Master/User/Create.jsx';
import MasterUserEdit from '../views/Master/User/Edit.jsx';
// PRODUK
import MasterProduk from '../views/Master/Produk/Produk.jsx';
import MasterProdukDetail from '../views/Master/Produk/Detail.jsx';
import MasterProdukCreate from '../views/Master/Produk/Create.jsx';
import MasterProdukEdit from '../views/Master/Produk/Edit.jsx';
// KATEGORI
import MasterKategori from '../views/Master/Kategori/Kategori.jsx';
import MasterKategoriDetail from '../views/Master/Kategori/Detail.jsx';
import MasterKategoriCreate from '../views/Master/Kategori/Create.jsx';
import MasterKategoriEdit from '../views/Master/Kategori/Edit.jsx';
// REKENING
import MasterRekening from '../views/Master/Rekening/Rekening.jsx';
import MasterRekeningDetail from '../views/Master/Rekening/Detail.jsx';
import MasterRekeningCreate from '../views/Master/Rekening/Create.jsx';
import MasterRekeningEdit from '../views/Master/Rekening/Edit.jsx';
// PENGIRIMAN
import MasterPengiriman from '../views/Master/Pengiriman/Pengiriman.jsx';
// import MasterPengirimanSelesai from '../views/Master';
import MasterPengirimanDetail from '../views/Master/Pengiriman/Detail.jsx';
import MasterPengirimanCreate from '../views/Master/Pengiriman/Create.jsx';
import MasterPengirimanEdit from '../views/Master/Pengiriman/Edit.jsx';
// PAGE
import MasterPage from '../views/Master/Page/Page.jsx';
import MasterPageDetail from '../views/Master/Page/Detail.jsx';
import MasterPageCreate from '../views/Master/Page/Create.jsx';
import MasterPageEdit from '../views/Master/Page/Edit.jsx';
// SECTION
import MasterSection from '../views/Master/Section/Section.jsx';
import MasterSectionDetail from '../views/Master/Section/Detail.jsx';
import MasterSectionCreate from '../views/Master/Section/Create.jsx';
import MasterSectionEdit from '../views/Master/Section/Edit.jsx';
// CONTENT
import MasterContent from '../views/Master/Content/Content.jsx';
import MasterContentDetail from '../views/Master/Content/Detail.jsx';
import MasterContentCreate from '../views/Master/Content/Create.jsx';
import MasterContentEdit from '../views/Master/Content/Edit.jsx';

function MasterRoutes() {
    return (
        <Routes>
            <Route index element={<Master />} />  {/* Rute default ke Master */}

            <Route path="user" element={<MasterUser />} />  {/* Rute ke Master User */}
            <Route path="user/create" element={<MasterUserCreate />} />
            <Route path="user/edit/:id" element={<MasterUserEdit />} />
            <Route path="user/detail/:id" element={<MasterUserDetail />} />

            <Route path="produk" element={<MasterProduk />} />  {/* Rute ke Master User */}
            <Route path="produk/create" element={<MasterProdukCreate />} />
            <Route path="produk/edit/:id" element={<MasterProdukEdit />} />
            <Route path="produk/detail/:id" element={<MasterProdukDetail />} />

            <Route path="kategori" element={<MasterKategori />} />  {/* Rute ke Master User */}
            <Route path="kategori/create" element={<MasterKategoriCreate />} />
            <Route path="kategori/edit/:id" element={<MasterKategoriEdit />} />
            <Route path="kategori/detail/:id" element={<MasterKategoriDetail />} />

            <Route path="rekening" element={<MasterRekening />} />  {/* Rute ke Master User */}
            <Route path="rekening/create" element={<MasterRekeningCreate />} />
            <Route path="rekening/edit/:id" element={<MasterRekeningEdit />} />
            <Route path="rekening/detail/:id" element={<MasterRekeningDetail />} />

            <Route path="pengiriman" element={<MasterPengiriman />} />  {/* Rute ke Master User */}
            <Route path="pengiriman/create" element={<MasterPengirimanCreate />} />
            <Route path="pengiriman/edit/:id" element={<MasterPengirimanEdit />} />
            <Route path="pengiriman/detail/:id" element={<MasterPengirimanDetail />} />

            <Route path="page" element={<MasterPage />} />  {/* Rute ke Master User */}
            <Route path="page/create" element={<MasterPageCreate />} />
            <Route path="page/edit/:id" element={<MasterPageEdit />} />
            <Route path="page/detail/:id" element={<MasterPageDetail />} />

            <Route path="section" element={<MasterSection />} />  {/* Rute ke Master User */}
            <Route path="section/create" element={<MasterSectionCreate />} />
            <Route path="section/edit/:id" element={<MasterSectionEdit />} />
            <Route path="section/detail/:id" element={<MasterSectionDetail />} />

            <Route path="content" element={<MasterContent />} />  {/* Rute ke Master User */}
            <Route path="content/create" element={<MasterContentCreate />} />
            <Route path="content/edit/:id" element={<MasterContentEdit />} />
            <Route path="content/detail/:id" element={<MasterContentDetail />} />
        </Routes>
    );
}

export default MasterRoutes;
