import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice'
import usersReducer from './slices/usersSlice'
import { apiSlice,adminApi} from './slices/apiSlice';


const store = configureStore({
  reducer: {
    auth:authReducer,
    admin:adminReducer,
    user:usersReducer,

    // [apiSlice.reducerPath]:apiSlice.reducer,
    // [adminApi.reducerPath]:apiSlice.reducer

  },
  // middleware: [...getDefaultMiddleware(), apiSlice.middleware, adminApi.middleware],

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware,adminApi.middleware),
  devTools: true,
});

export default store;