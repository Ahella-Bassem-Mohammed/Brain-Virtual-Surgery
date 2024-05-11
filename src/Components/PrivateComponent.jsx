import React from "react";
import { Navigate,Outlet } from "react-router-dom";

export const PrivateComponent=()=>{
    const auth=localStorage.getItem("userInfo");
    return auth? <Outlet/>:<Navigate to="/signup"></Navigate>
}

