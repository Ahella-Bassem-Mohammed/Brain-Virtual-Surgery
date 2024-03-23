import React, { useState } from "react";
import "./LoginSignup/LoginSignup.css";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  

  const formSubmitHandler = (e) => {
    e.preventDefault();
  
    if (email.trim() === "") return toast.error("E-mail is required !!");
  
    dispatch(forgotPassword({Email:email}));
  };
  return (
    <div className="login">
      <div className="container">
        <div className="header">
          <div className="text">Forgot Password</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={formSubmitHandler} method="post">
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <FaUser className="icon" />
            </div>
            
            <div className="submit-container">
              <center>
                {" "}
                <button type="submit" className="submit">
                  {" "}
                  Submit
                </button>
              </center>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
