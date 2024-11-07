import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import orderReducer from './slices/OrderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  }
});

export default store;