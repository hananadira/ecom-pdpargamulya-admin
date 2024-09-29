import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pembelian: [],
};

const pembelianSlice = createSlice({
  name: "pembelian",
  initialState,
  reducers: {
    addItem(state, action) {
      state.pembelian.push(action.payload);
    },
    removeItem(state, action) {
      state.pembelian = state.pembelian.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const existingItem = state.pembelian.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, updatedItem);
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = pembelianSlice.actions;
export default pembelianSlice.reducer;
