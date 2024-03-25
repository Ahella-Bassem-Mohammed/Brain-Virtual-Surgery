import React, { useState } from "react";
import "./LoginSignup/LoginSignup.css";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("E-mail is required ");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ Email: email, Password: password }));
    if (toast.error("invalid Email or Password")) return navigate("/login");
  };

  const SetCookie = () => {
    Cookies.set("email", document.getElementById("email").value, {
      expires: 1,
    });
    Cookies.set("password", document.getElementById("password").value, {
      expires: 1,
    });
  };

  return (
    <div className="login">
      <div className="pic">
        <div className="header">
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
              <a href="/forgot-password">Forgot Password?</a>
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
          <h3>First Time ?</h3>
          <p>Become a part of our community!</p>
          <button
            className="btn transparent"
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
