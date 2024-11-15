import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetPengirimanQuery } from '../services/PengirimanApi'; // Pastikan ini import hook, bukan API

// Thunks untuk operasi CRUD
export const fetchPengiriman = createAsyncThunk(
  'pengiriman/fetchPengiriman',
  async (id) => {
    const response = await fetchBaseQuery({ baseUrl: baseUrlApi })(`/orders/${id}`); // Perbaiki fetch
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

export default pengirimanSlice.reducer; // Pastikan ini ekspor default
