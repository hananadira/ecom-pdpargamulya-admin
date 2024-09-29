import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardRoutes from './routes/dashboardRoutes';
import PembelianRoutes from './routes/pembelianRoutes';
import DetailPembelian from './routes/pembelianRoutes';
import PengirimanRoutes from './routes/pengirimanRoutes';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route with nested child routes */}
        <Route path="/" element={<Layout />}>
          {/* Add "/*" to indicate this route may have child routes */}
          <Route path="/" element={<DashboardRoutes />} />
          <Route path="/pembelian/*" element={<PembelianRoutes />}>
              <Route path="detail/:id" element={<DetailPembelian />}/>
          </Route>
          <Route path="/pengiriman" element={<PengirimanRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
