import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductCart } from "../../entities/BosaNoga";

export interface CartState {
  products: ProductCart[],
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(product => product.id != action.payload.id);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const {
  addProduct,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;