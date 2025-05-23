import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        'order/placeOrder',
        orderData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('order/userOrders');
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    userOrders: [],  // add state for user orders
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    // Optional: Add a reset action to clear order state
    resetOrderState: (state) => {
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      })
       .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload.orders;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;