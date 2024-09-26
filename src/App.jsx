import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pembelian from "./pages/Pembelian";
import Pengiriman from "./pages/Pengiriman";
import Laporan from "./pages/Laporan";
import Master from "./pages/Master";
import LprnPembelian from './pages/Laporan/Pembelian';
import LprnPengiriman from './pages/Laporan/Penjualan';
import MsterUser from './pages/Master/User';
import MsterProduct from './pages/Master/Produk';
import MsterKategori from './pages/Master/Kategori';
import MsterRekening from './pages/Master/Rekening';
import MsterPage from './pages/Master/Page';
import MsterSection from './pages/Master/Section';
import MsterContent from './pages/Master/Content';
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
