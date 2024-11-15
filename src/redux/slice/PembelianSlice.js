import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBaseQuery } from '@reduxjs/toolkit/query'; // Pastikan fetchBaseQuery diimpor
import { baseUrlApi } from '../services/ApiCore'; // Ganti dengan URL API yang sesuai jika perlu

// Thunks untuk operasi CRUD
export const fetchPembelian = createAsyncThunk(
  'pembelian/fetchPembelian',
  async (id) => {
    const response = await fetchBaseQuery({ baseUrl: baseUrlApi })(`/orderDetail/${id}`); // Perbaiki fetch
    return response.data;
  }
);

// Initial state
const initialState = {
  pembelianApi: [],
  loading: false,
  error: null,
};

// Pembelian slice
const pembelianSlice = createSlice({
  name: 'pembelian',
  initialState,
  reducers: {
    removePembelianData: (state, action) => {
      // Menghapus data berdasarkan ID
      state.pembelianApi = state.pembelianApi.filter(item => item.id !== action.payload);
    },
  },
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

export const { removePembelianData } = pembelianSlice.actions; // Ekspor aksi removePembelianData
export default pembelianSlice.reducer; // Ekspor reducer
