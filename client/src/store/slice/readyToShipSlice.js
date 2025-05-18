import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

// Async thunk for fetching ready-to-ship products by slug
export const fetchdata = createAsyncThunk(
  'readyToShip/fetchdata',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`product/readToShipwithSlug/${slug}`);
      console.log('Response:', response.data);
      return { slug, data: response.data.products };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const readyToShipSlice = createSlice({
  name: 'readyToShip',
  initialState: {
    data: {
      men: [],
      women: []
    },
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        const { slug, data } = action.payload;
        state.data[slug] = data;
        state.loading = false;
      })
      .addCase(fetchdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export default readyToShipSlice.reducer;
