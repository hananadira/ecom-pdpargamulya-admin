import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Data user setelah login
  token: localStorage.getItem('authToken') || null, // Muat token dari localStorage
  isAuthenticated: !!localStorage.getItem('authToken'), // Status login
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isLoggedIn;
      localStorage.setItem('authToken', action.payload.token); // Simpan token ke localStorage
    },
    setAuthUser: (state, action) => {
      state.user = action.payload; // Menyimpan data user ke state
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authToken'); // Hapus token dari localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      localStorage.removeItem('authToken'); // Hapus token dari localStorage
    },
  },
});

export const { setAuthToken, setAuthUser, clearAuth, logout } = authSlice.actions;
export default authSlice.reducer;
