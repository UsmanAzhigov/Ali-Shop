import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfileItems = createAsyncThunk('profile/fetchProfileItems', async () => {
  const { data } = await axios.get('https://5f86d4f2ec72996e.mokky.dev/profile');
  return data;
});

const initialState = {
  items: [],
  status: 'loading' | 'success' | 'error',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchProfileItems.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchProfileItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      }),
      builder.addCase(fetchProfileItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const profileReducer = profileSlice.reducer;
