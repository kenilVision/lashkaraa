import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

// Async thunk for fetching celeb closet data
export const fetchcelebCloset = createAsyncThunk(
  'celebCloset/fetchcelebCloset',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('product/celebCloset');
      console.log('Response:', response.data);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const celebClosetSlice = createSlice({
  name: 'celebCloset',
  initialState: {
    data: [],
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchcelebCloset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcelebCloset.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchcelebCloset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export default celebClosetSlice.reducer;
