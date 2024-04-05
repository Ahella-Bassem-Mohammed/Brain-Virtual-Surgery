import "./verification.css";
import React, { useEffect, useState } from "react";

import { FaLock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../../redux/apiCalls/passwordApiCall";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [dispatch, userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required !!");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <div className="forgot-reset-field">
      <div className="forgot-reset-container">
        <>
          <div className="header">
            <div className="text">Reset Password</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={formSubmitHandler}>
            <div className="inputs">
              <div className="input">
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <FaLock className="icon" />
              </div>

              <div className="submit-container">
                <center>
                  <button type="submit" className="submit">
                    {" "}
                    Submit{" "}
                  </button>
                </center>
              </div>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default ResetPassword;