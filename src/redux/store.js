// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import pembelianReducer from './slice/PembelianSlice';
import pembelianApi from './services/PembelianApi';

const store = configureStore({
  reducer: {
    pembelian: pembelianReducer,
    [pembelianApi.reducerPath]: pembelianApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pembelianApi.middleware),
});

export default store; 
