// src/redux/slice/PembelianSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetPembelianQuery } from '../services/PembelianApi';

// Thunks untuk operasi CRUD
export const fetchPembelian = createAsyncThunk(
  'pembelian/fetchPembelian',
  async () => {
    const response = await useGetPembelianQuery();
    return response.data;
  }
);

const initialState = {
  pembelianApi: [],
  loading: false,
  error: null,
};

const pembelianSlice = createSlice({
  name: 'pembelian',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPembelian.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPembelian.fulfilled, (state, action) => {
        state.loading = false;
        state.pembelianApi = action.payload;
      })
      .addCase(fetchPembelian.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pembelianSlice.reducer;
