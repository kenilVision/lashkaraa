import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchCollection = createAsyncThunk(
  'collection/fetchCollection',
  async ({ slug, filters }, { rejectWithValue }) => {
    try {
    
      const queryParams = new URLSearchParams(filters).toString();

      const response = await axiosInstance.get(
        `product/getAllProducts/${slug}?${queryParams}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProduct  = createAsyncThunk(
  'collection/searchProduct',
  async ({ filters }, { rejectWithValue }) => {
    try {
    
      const queryParams = new URLSearchParams(filters).toString();

      const response = await axiosInstance.get(
        `product/search?${queryParams}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    data: [],
    filter:[],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.filter = action.payload.filters;
        state.loading = false;
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
       .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.filter = action.payload.filters;
        state.loading = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default collectionSlice.reducer;
