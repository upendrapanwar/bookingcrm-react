

import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    isRemovingViaAPI: false,
  },
  reducers: {

    addToCart: (state, action) => {     
      const itemInCart = state.cart.find((item) => item._id  === action.payload._id );

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      } 
      
    },
   
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      //let totalQuantity = 0
      let totalPrice = 0
      //let percent = state.percent;
      //let discount = 0;
      state.cart.forEach(item => {
        //totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
      })
      
      // discount = (totalPrice * (percent/100));
      // state.discount = discount;
      // state.totalPrice = totalPrice - discount;
      state.totalPrice = totalPrice;
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 0) {
        item.quantity = 0
      } else {
        item.quantity--;
      }
      //let totalQuantity = 0
      let totalPrice = 0
      //let percent = state.percent;
      //let discount = 0;
      state.cart.forEach(item => {
        //totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
      })
      
      //discount = (totalPrice * (percent/100));
      //state.discount = discount;
      //state.totalPrice = totalPrice - discount;
      state.totalPrice = totalPrice;
    },


    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
      //let totalQuantity = 0
      let totalPrice = 0
      //let percent = state.percent;
      //let discount = 0;
      state.cart.forEach(item => {
        //totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
      }) 
      // toast.error("Removed From Cart!", { position: "top-center",autoClose: 3000 });

      //discount = (totalPrice * (percent/100));
      //state.discount = discount;
      //state.totalPrice = totalPrice - discount;
      state.totalPrice = totalPrice;
      if (removeItem.quantity === 0) {
        state.percent = 0;
        state.discount = 0;

      }
    },

    
    clearCart: (state, action) => {
      state.cart = [];
      state.percent = 0;
      state.discount = 0;
      state.totalPrice = 0;
    },
    getDiscount: (state, action) => {
      //let totalQuantity = 0
      let totalPrice = 0
      let percent = action.payload;
      let discount = 0;
      state.cart.forEach(item => {
        //totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
      })
      
      //discount = (totalPrice * (percent/100));
      state.discount = discount;
      state.percent = percent;
      state.totalPrice = totalPrice - discount;
      console.log('TotalPrice=',state.totalPrice)
    },
    
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem} = cartSlice.actions;
