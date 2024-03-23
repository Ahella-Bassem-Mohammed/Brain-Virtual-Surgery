import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { passwordReducer } from "./slices/passwordSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        password:passwordReducer,
    }
});

export default store;