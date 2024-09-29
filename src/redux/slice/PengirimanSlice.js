import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItem(state, action) {
      state.products.push(action.payload);
    },
    removeItem(state, action) {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, updatedItem);
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = productsSlice.actions;
export default productsSlice.reducer;