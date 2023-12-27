import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCardInfo = createAsyncThunk('cardInfo/fetchCardInfo', async ({ id }) => {
  const { data } = await axios.get(`https://5f86d4f2ec72996e.mokky.dev/items/${id}`);
  return [data];
});

const initialState = {
  items: [],
  status: 'loading' | 'success' | 'error',
};

const cardInfo = createSlice({
  name: 'cardInfo',
  initialState,
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchCardInfo.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchCardInfo.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      }),
      builder.addCase(fetchCardInfo.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const cardInfoReducer = cardInfo.reducer;
