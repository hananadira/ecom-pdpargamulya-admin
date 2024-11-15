import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isVerified: false, 
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setVerified: (state, action) => {
      state.isVerified = action.payload.isVerified; // Update the verified state
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.isVerified = false; // Reset the IsVerified state on logout
      localStorage.removeItem("authState"); // Clear localStorage on logout
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isVerified = false;
      localStorage.removeItem("authState"); // Clear localStorage when auth is reset
    },
  },
});

export const { setAuthUser, setAuthToken, setVerified, logout, clearAuth} = authSlice.actions;
export default authSlice.reducer;