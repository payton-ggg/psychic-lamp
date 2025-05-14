import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/countrySlice";

export const store = configureStore({
  reducer: {
    country: counterReducer,
  },
});
