// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import pembelianReducer from './slice/PembelianSlice';
import pengirimanReducer from './slice/PengirimanSlice';
import { ApiCore } from './services/ApiCore';

const rootReducer = combineReducers({
  pembelian: pembelianReducer,
  pengiriman: pengirimanReducer,
  [ApiCore.reducerPath]: ApiCore.reducer,
});

export default rootReducer;
