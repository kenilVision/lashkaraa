import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";


export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.get("/cart");
        return res;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  
  export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (cartData, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.post("/cart", cartData);
        return res.item;
      } catch (err) {
       
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  export const addToMultiCart = createAsyncThunk(
    "cart/addToMultiCart",
    async (cartData, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.post("/cart/create", cartData);
        console.log(res)
        return res.items;
      } catch (err) {
       
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  
  export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (cartId, { rejectWithValue }) => {
      try {
        console.log(cartId)
        await axiosInstance.delete(`/cart/${cartId}`);
        return cartId;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );


  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {
      clearCart: (state) => {
        state.items = [];
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch Cart
        .addCase(fetchCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Add to Cart
        .addCase(addToCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.loading = false;
          const existingIndex = state.items.findIndex(
            item => item._id === action.payload._id && item.size === action.payload.size 
          );
          
          if (existingIndex >= 0) {
            state.items[existingIndex] = action.payload;
          } else {
           
            state.items.push(action.payload);
          }
        })
        .addCase(addToCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Add to Multi Cart
        .addCase(addToMultiCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addToMultiCart.fulfilled, (state, action) => {
          state.loading = false;
          action.payload.forEach(newItem => {
            
            const existingIndex = state.items.findIndex(
              item => item._id === newItem._id && item.size === newItem.size
            );
            
            if (existingIndex >= 0) {
             
              state.items[existingIndex] = newItem;
            } else {
              
              state.items.push(newItem);
            }
          });
        })
        .addCase(addToMultiCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Remove from Cart
        .addCase(removeFromCart.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
          state.loading = false;
          state.items = state.items.filter(item => item._id !== action.payload);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearCart } = cartSlice.actions;
  export default cartSlice.reducer;

  
