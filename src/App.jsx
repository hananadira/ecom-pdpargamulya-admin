// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardRoutes from './routes/dashboardRoutes';
import PembelianRoutes from './routes/pembelianRoutes';
import PengirimanRoutes from './routes/pengirimanRoutes';
import LaporanRoute from './routes/laporanRoute';
import MasterRoute from './routes/masterRoute';
import './index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Mencegah CSS otomatis jika sudah ditambahkan

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardRoutes />} />
        <Route path="pembelian/*" element={<PembelianRoutes />} /> {/* Tambahkan "/*" untuk rute anak */}
        <Route path="pengiriman/*" element={<PengirimanRoutes />} />
        <Route path="laporan/*" element={<LaporanRoute />} />
        <Route path="master/*" element={<MasterRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
