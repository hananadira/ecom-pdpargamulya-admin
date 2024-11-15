import { configureStore } from '@reduxjs/toolkit';
import PembelianApi from './services/PembelianApi';
import PengirimanApi from './services/PengirimanApi';
import UserApi from './services/UserApi';
import pembelianReducer from './slice/PembelianSlice'; // Import pembelianReducer

const store = configureStore({
  reducer: {
    [PembelianApi.reducerPath]: PembelianApi.reducer,
    [PengirimanApi.reducerPath]: PengirimanApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    pembelian: pembelianReducer, // Tambahkan reducer pembelian
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PembelianApi.middleware,
      PengirimanApi.middleware,
      UserApi.middleware
    ),
});

export default store;
