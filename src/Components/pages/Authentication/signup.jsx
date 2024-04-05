import "./authentication.css";
import "../Verification/verification.css";
import React from "react";
import { useState } from "react";
import { BiMessageRoundedDetail, BiMessageSquareDots } from "react-icons/bi";
import { FaUser, FaLock, FaTransgender } from "react-icons/fa";
import { MdEmail, MdSubtitles } from "react-icons/md";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/apiCalls/authApiCall";

export const Signup = () => {
  const dispatch = useDispatch();

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (fname.trim() === "") return toast.error("First name is required");
    if (lname.trim() === "") return toast.error("Last name is required");
    if (uname.trim() === "") return toast.error("User name is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (age.trim() === "") return toast.error("Age is required");
    if (gender.trim() === "") return toast.error("Gender is required");
    if (title.trim() === "") return toast.error("Title is required");
    if (specialist.trim() === "") return toast.error("Specialist is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(
      registerUser({
        FirstName: fname,
        LastName: lname,
        UserName: uname,
        Email: email,
        Age: age,
        Gender: gender,
        Title: title,
        Specialist: specialist,
        Password: password,
      })
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-pic">
        <div className="start">
          <div className="text">Sign Up</div>
          <div className="line"></div>
        </div>
        <form onSubmit={formSubmitHandler}>
          {" "}
          <div className="signup-inputs">
            <div className="rowflex">
              <div className="signup-input">
                <input
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>

              <div className="signup-input">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
            </div>

            <div className="rowflex">
              <div className="signup-input">
                <input
                  type="text"
                  placeholder="User Name"
                  value={uname}
                  onChange={(e) => setUName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>

              <div className="signup-input">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="icon" />
              </div>
            </div>

            <div className="rowflex">
              <div className="signup-input">
                <input
                  type="text"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <BiMessageRoundedDetail className="icon" />
              </div>

              <div className="signup-input">
                <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <FaTransgender className="icon" />
              </div>
            </div>

            <div className="rowflex">
              <div className="signup-input">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <MdSubtitles className="icon" />
              </div>

              <div className="signup-input">
                <input
                  type="text"
                  placeholder="Specialist"
                  value={specialist}
                  onChange={(e) => setSpecialist(e.target.value)}
                />
                <BiMessageSquareDots className="icon" />
              </div>
            </div>

            <div className="rowflex">
              <div className="signup-input">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>

              <div >
                <center>
                  {" "}
                  <button type="submit" className="signup-submit">
                    {" "}
                    Sign Up
                  </button>
                </center>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
