import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import goalReducer from "./goals/goalsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
});
