//combineReducers kết hợp nhiều reducers, và configureStore giúp tạo ra một Redux store.
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/UserSlice';
import orderReducer from './slices/OrderSlice';
import productReducer from './slices/ProductSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage, //Lưu vào storage
    blacklist: ['user', 'product'], //Không áp dụng cho user
};

//Kết hợp các reducer thành 1 rootReducer
const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    product: productReducer,
});

//Kết hợp persistConfig và rootReducer tạo thành 1 reducer có hỗ trợ lưu trữ
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Cấu hình store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (
        getDefaultMiddleware //Thêm các middleware mặc định và bỏ qua các kiểm tra serializable cho các hành động liên quan đến redux-persist
    ) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export let persistor = persistStore(store); //Sử dụng persistor để tạo ra đối tượng giúp quản lý trạng thái lưu trữ

export default store;
