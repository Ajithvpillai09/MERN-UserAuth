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
  },
  devTools: true,
});
 
export default store;

























// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import adminReducer from './slices/adminSlice';
// import usersReducer from './slices/usersSlice';
// import { apiSlice, adminApi } from './slices/apiSlice';
// import { setupListeners } from '@reduxjs/toolkit/query/react';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     admin: adminReducer,
//     user: usersReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     [adminApi.reducerPath]: adminApi.reducer, 
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware, adminApi.middleware),
//   devTools: true,
// });

// setupListeners(store.dispatch);

// export default store;
