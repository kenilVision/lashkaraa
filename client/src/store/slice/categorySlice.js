import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
      const response = await axiosInstance.get('categories/getAllCategories');
      return response.data;  
    }
  );

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
