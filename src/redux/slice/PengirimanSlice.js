import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pengiriman: [],
};

const pengirimanSlice = createSlice({
  name: "pengiriman",
  initialState,
  reducers: {
    addItem(state, action) {
      state.pengiriman.push(action.payload);
    },
    removeItem(state, action) {
      state.pengiriman = state.pengiriman.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const existingItem = state.pengiriman.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, updatedItem);
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = pengirimanSlice.actions;
export default pengirimanSlice.reducer;
