import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout';
import DashboardRoutes from './routes/dashboardRoutes';
import PembelianRoutes from './routes/pembelianRoutes';
import PengirimanRoutes from './routes/pengirimanRoutes';
import LaporanRoutes from './routes/laporanRoute';
import MasterRoute from './routes/masterRoute';
import Login from './views/login';
import { setAuthToken } from './redux/slice/AuthSlice';
import './index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { PengirimanProvider } from './views/Pengiriman/PengirimanContext';

config.autoAddCss = false;

function App() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      dispatch(setAuthToken({
        token: localStorage.getItem('authToken'),
        isLoggedIn: true,
      }));
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Route login */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

      {/* Route utama, memerlukan login untuk mengakses halaman lainnya */}
      <Route path="/*" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<DashboardRoutes />} />
        <Route path="home/*" element={<DashboardRoutes />} />
        <Route path="pembelian/*" element={<PembelianRoutes />} />
        <Route path="pengiriman/*" element={
          <PengirimanProvider>
            <PengirimanRoutes />
          </PengirimanProvider>
        } />
        <Route path="laporan/*" element={<LaporanRoutes />} />
        <Route path="master/*" element={<MasterRoute />} />
      </Route>

      {/* Route untuk halaman yang tidak ditemukan */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
