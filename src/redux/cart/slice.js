import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const { data } = await axios.get('https://5f86d4f2ec72996e.mokky.dev/cart');
  return data;
});

export const fetchRemoveItems = createAsyncThunk('cart/fetchRemoveItems', async ({ id }) => {
  const { data } = await axios.delete(`https://5f86d4f2ec72996e.mokky.dev/cart/${id}`);
  return data;
});

export const fetchClearItems = createAsyncThunk('cart/fetchClearItems', async (items) => {
  const deleteReq = items.map((item) =>
    axios.delete(`https://5f86d4f2ec72996e.mokky.dev/cart/${item.id}`),
  );
  await Promise.all(deleteReq);
});

export const fetchAddItems = createAsyncThunk('home/fetchAddItems', async ({ obj }) => {
  const { data } = await axios.post('https://5f86d4f2ec72996e.mokky.dev/cart', obj);
  return data;
});

export const fetchPayProduct = createAsyncThunk('cart/fetchPayProduct', async ({ items }) => {
  const payReqests = items.map((item) =>
    axios.post('https://5f86d4f2ec72996e.mokky.dev/profile', item),
  );
  await Promise.all(payReqests);
});

const initialState = {
  items: [],
  status: 'loading' | 'success' | 'error',
  totalPrice: 0,
  count: 1,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);
      if (findItems) {
        findItems.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    minusItem: (state, action) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);
      if (findItems) {
        findItems.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.count * obj.price, 0);
    },
  },
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchCartItems.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        state.status = 'success';
      }),
      builder.addCase(fetchCartItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      }),
      //DELETE PRODUCT
      builder.addCase(fetchRemoveItems.pending, (state) => {
        state.status = 'loading';
      }),
      builder.addCase(fetchRemoveItems.fulfilled, (state, action) => {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        state.status = 'success';
      }),
      builder.addCase(fetchRemoveItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      }),
      //CLEAR CART
      builder.addCase(fetchClearItems.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      }),
      builder.addCase(fetchClearItems.fulfilled, (state) => {
        state.items = [];
        state.status = 'success';
      }),
      builder.addCase(fetchClearItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      }),
      //ADD PRODUCTS
      builder.addCase(fetchAddItems.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      }),
      builder.addCase(fetchAddItems.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'success';
      }),
      builder.addCase(fetchAddItems.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
    //PAY PRODUCT
    builder.addCase(fetchPayProduct.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(fetchPayProduct.fulfilled, (state, action) => {
        if (state.items.push(action.payload)) {
          state.items = [];
        }
        state.status = 'success';
      }),
      builder.addCase(fetchPayProduct.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { setItems, addItem, minusItem, clearItems } = cartSlice.actions;
