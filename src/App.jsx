import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Pembelian from "./views/Pembelian/Pembelian";
import Pengiriman from "./views/Pengiriman/Pengiriman";
import Laporan from "./views/Laporan/Laporan";
import Master from "./views/Master/Master";
import LprnPembelian from './views/Laporan/Pembelian';
import LprnPengiriman from './views/Laporan/Penjualan';
import MsterUser from './views/Master/User/User';
import MsterProduct from './views/Master/Produk/Produk';
import MsterKategori from './views/Master/Kategori/Kategori';
import MsterRekening from './views/Master/Rekening/Rekening';
import MsterPage from './views/Master/Page/Page';
import MsterSection from './views/Master/Section/Section';
import MsterContent from './views/Master/Content/Content';
// import 'flowbite';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Home route */}
          <Route index element={<Home/>} />
          {/* Pembelian route */}
          <Route path="pembelian" element={<Pembelian/>} />
          {/* pengiriman route */}
          <Route path="pengiriman" element={<Pengiriman/>} />
          {/* laporan route */}
          <Route path="laporan" element={<Laporan/>} />
          {/* master route */}
          <Route path="master" element={<Master/>} />
          {/* LprnPembelian route */}
          <Route path="laporan/pembelian" element={<LprnPembelian/>} />
          {/* LprnPengiriman route */}
          <Route path="laporan/penjualan" element={<LprnPengiriman/>} />
          {/* MsterUser route */}
          <Route path="master/user" element={<MsterUser/>} />
          {/* MsterProduct route */}
          <Route path="master/produk" element={<MsterProduct/>} />
          {/* MsterKategori route */}
          <Route path="master/kategori" element={<MsterKategori/>} />
          {/* MsterRekening route */}
          <Route path="master/rekening" element={<MsterRekening/>} />
          {/* MsterPage route */}
          <Route path="master/page" element={<MsterPage/>} />
          {/* MsterSection route */}
          <Route path="master/section" element={<MsterSection/>} />
          {/* MsterContent route */}
          <Route path="master/content" element={<MsterContent/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
