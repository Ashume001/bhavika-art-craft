import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const existing = state.items.find(
        (item) => item.cartId === action.payload.cartId
      );

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload });
      }
      localStorage.setItem("cart", JSON.stringify(state.items))
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items))
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    
    incrementQuantity: (state, action) => {
       const item = state.items.find(
       (item) => item.cartId === action.payload
       );
       if (item) {
        item.quantity += 1;
       }
       localStorage.setItem("cart", JSON.stringify(state.items))
       },

    decrementQuantity: (state, action) => {
       const item = state.items.find(
      (item) => item.cartId === action.payload
       );
       if (item && item.quantity > 1) {
        item.quantity -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.items))
       },


  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
