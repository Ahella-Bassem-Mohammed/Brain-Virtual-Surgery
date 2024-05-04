import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { passwordReducer } from "./slices/passwordSlice";
import { profileReducer } from "./slices/profileSlice";
import { patientReducer } from "./slices/patientSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        profile:profileReducer,
        patient:patientReducer,
        password:passwordReducer,

    }
});

export default store;