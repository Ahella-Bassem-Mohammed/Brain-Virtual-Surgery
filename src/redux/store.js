import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { passwordReducer } from "./slices/passwordSlice";
import { profileReducer } from "./slices/profileSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        profile:profileReducer,
        password:passwordReducer,

    }
});

export default store;