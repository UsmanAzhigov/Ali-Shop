import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('home/fetchItems', async () => {
  const { data } = await axios.get('https://5f86d4f2ec72996e.mokky.dev/items');
  return data;
});

const initialState = {
  items: [],
  status: 'loading' | 'success' | 'error',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchItems.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      }),
      builder.addCase(fetchItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const homeReducer = homeSlice.reducer;
export const { setItems } = homeSlice.actions;
