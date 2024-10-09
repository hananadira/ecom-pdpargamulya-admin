// src/redux/slice/PengirimanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetPengirimanQuery } from '../services/PengirimanApi';

// Thunks untuk operasi CRUD
export const fetchPengiriman = createAsyncThunk(
  'pengiriman/fetchPengiriman',
  async () => {
    const response = await useGetPengirimanQuery();
    return response.data;
  }
);

const initialState = {
  pengirimanApi: [],
  loading: false,
  error: null,
};

const pengirimanSlice = createSlice({
  name: 'pengiriman',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPengiriman.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPengiriman.fulfilled, (state, action) => {
        state.loading = false;
        state.pengirimanApi = action.payload;
      })
      .addCase(fetchPengiriman.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pengirimanSlice.reducer;
