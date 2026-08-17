import { configureStore } from "@reduxjs/toolkit";
import  counterSlice   from "./counterSlice";
import  userSlice  from "./userSlice";
import authReducer from "./authSlice";
export const store = configureStore({
    reducer: {
        counter:counterSlice,
        user:userSlice,
        auth: authReducer,
    }
})