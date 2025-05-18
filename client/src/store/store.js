import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice/categorySlice';
import readyToShip from './slice/readyToShipSlice'
import celebClosetReducer from './slice/celebClosetSlice';
import collectionReducer from './slice/collectionSlice';
import productReducer from './slice/productSlice';
import userReducer from './slice/userSlice';
import wishlistReducer from './slice/wishlistSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice'
const store = configureStore({
  reducer: {
    category: categoryReducer,
    readyToShip: readyToShip,
    celebCloset : celebClosetReducer,
    collection : collectionReducer,
    product : productReducer,
    wishlist : wishlistReducer,
    user: userReducer,
    cart: cartSlice,
    order : orderSlice
  },
});

export default store;