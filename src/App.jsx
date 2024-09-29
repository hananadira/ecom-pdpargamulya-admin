import { useState } from 'react'
import DashboardRoutes from './routes/dashboardRoutes';
import PembelianRoutes from './routes/pembelianRoutes';
import PengirimanRoutes from './routes/pengirimanRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DashboardRoutes/>
      <PengirimanRoutes/>
      <PembelianRoutes/>
    </>
  )
}

export default App