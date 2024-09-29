import { configureStore } from '@reduxjs/toolkit';
import pengirimanSlice from './slice/PengirimanSlice';
import pembelianSlice from './slice/PembelianSlice';

const store = configureStore({
  reducer: {
    pembelian: pembelianSlice,
    pengiriman: pengirimanSlice,
  },
});

export default store;
