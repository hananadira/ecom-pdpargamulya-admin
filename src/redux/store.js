import { configureStore } from '@reduxjs/toolkit';
import PembelianApi from './services/PembelianApi';
import PengirimanApi from './services/PengirimanApi';
import UserApi from './services/UserApi';
import AuthApi from './services/AuthApi';
import RekeningApi from './services/RekeningApi';
import authReducer from './slice/AuthSlice';
import searchReducer from './services/SearchApi'; // Import searchReducer
import pembelianReducer from './slice/PembelianSlice'; // Import pembelianReducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Tambahkan reducer auth di sini
    [AuthApi.reducerPath]: AuthApi.reducer,
    [PembelianApi.reducerPath]: PembelianApi.reducer,
    [PengirimanApi.reducerPath]: PengirimanApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [RekeningApi.reducerPath]: RekeningApi.reducer,
    pembelian: pembelianReducer, // Tambahkan reducer pembelian
    search: searchReducer, // Tambahkan reducer pembelian
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      PembelianApi.middleware,
      PengirimanApi.middleware,
      UserApi.middleware,
      RekeningApi.middleware
    ),
});

export default store;
