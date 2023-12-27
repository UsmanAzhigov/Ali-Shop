import { configureStore } from '@reduxjs/toolkit';
import { homeReducer } from './home/slice';
import { cartReducer } from './cart/slice';
import { cardInfoReducer } from './cardInfo/slice';
import { profileReducer } from './profile/slice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    cardInfo: cardInfoReducer,
    profile: profileReducer,
  },
});

export default store;
