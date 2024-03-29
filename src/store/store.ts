import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import currentLocationSlice from "./currentLocationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    currentLocation: currentLocationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
