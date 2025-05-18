import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchSingleProduct = createAsyncThunk(
    'singleProduct/fetchSingleProduct',
    async (slug, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `product/getProductBySlug/${slug}`
        );
        
        console.log('Response:', response);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


  const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: {
      product: null,
      loading: true,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSingleProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.product = null;
        })
        .addCase(fetchSingleProduct.fulfilled, (state, action) => {
          state.product = action.payload.product;
          state.loading = false;
        })
        .addCase(fetchSingleProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
    },
  });
  
  export default singleProductSlice.reducer;