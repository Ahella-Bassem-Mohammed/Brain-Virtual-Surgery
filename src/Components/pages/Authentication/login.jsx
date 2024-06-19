import "./authentication.css";
import"../Verification/verification.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../../redux/apiCalls/authApiCall";
import { FaLock, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Login Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if(email.trim() === "") return toast.error("E-mail is required ");
    if(password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ Email: email, Password: password }));

    if(toast.error === "invalid Email or Password") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  // Setting a Cookie
  const SetCookie = () => {
    Cookies.set("email", document.getElementById("email").value, {
      expires: 1,
    });
    Cookies.set("password", document.getElementById("password").value, {
      expires: 1,
    });
  };

  return (
    <div className="login-container">
      <div className="login-pic">
        <div className="header_login">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className="inputs">
            <div className="input">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input">
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

            <div className="forgot-password">
              <label htmlFor="RM">
                <input
                  type="checkbox"
                  name="rememberme"
                  className="rememberme"
                  id="RM"
                />
                Remember me    
              </label>
              <a href="/forgot-password">Forgot Password ?</a>
            </div>

            <div className="submit-container">
              <center>
                <button type="submit" className="submit" onClick={SetCookie}>
                  {" "}
                  Login{" "}
                </button>
              </center>
            </div>
          </div>
        </form>
        <div className="add">
          <button
            className="btn  transparent"
            id="sign-up-btn"
            onClick={() => (window.location = "/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
