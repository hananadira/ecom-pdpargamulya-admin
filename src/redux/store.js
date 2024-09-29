// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
// import dashboard from '../features/user/userSlice';
import pengirimanSlice from './slice/PengirimanSlice';

const store = configureStore({
  reducer: {
    // user: dashboard,
    pengiriman: pengirimanSlice,
  },
});

export default store;
