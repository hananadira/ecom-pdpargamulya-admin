import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardRoutes from './routes/dashboardRoutes';
import PembelianRoutes from './routes/pembelianRoutes';
import PengirimanRoutes from './routes/pengirimanRoutes';
import LaporanRoutes from './routes/laporanRoute'; 
import MasterRoute from './routes/masterRoute';
// import Login from './views/login';  // Pastikan path ini sesuai dengan file Login Anda
import './index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { PengirimanProvider } from './views/Pengiriman/PengirimanContext';
config.autoAddCss = false; // Mencegah CSS otomatis jika sudah ditambahkan

function App() {
  return (
    <Routes>
      {/* Route default untuk Login */}
      {/* <Route path="/" element={<Login />} /> */}
      
      {/* Setelah login, arahkan pengguna ke /home */}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardRoutes />} />
        <Route path="pembelian/*" element={<PembelianRoutes />} />
        
        <Route path="pengiriman/*" element={
          <PengirimanProvider>
            <PengirimanRoutes />
          </PengirimanProvider>
        } />
        
        <Route path="laporan/*" element={<LaporanRoutes />} />
        <Route path="master/*" element={<MasterRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
