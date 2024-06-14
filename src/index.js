import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as xtk from "xtk";

window.X = xtk.X;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer position="top-center" autoClose={2000}/>
      </Provider>
    </BrowserRouter>
  
);
