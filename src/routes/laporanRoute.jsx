// LaporanRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportForm from '../views/Laporan/Laporan';
import ReportPage from '../views/Laporan/LaporanPembayaranCustomer';

function LaporanRoutes() {
  return (
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route path="/reports/:reportType" element={<ReportPage />} />
      </Routes>
  );
}

export default LaporanRoutes;
