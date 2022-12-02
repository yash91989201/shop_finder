import { configureStore } from "@reduxjs/toolkit";
import shopApi from "../features/shop/shopApi";
import authApi from "../features/auth/authApi";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
