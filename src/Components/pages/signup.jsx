import React from "react";
import { useState } from "react";
import "./LoginSignup/LoginSignup.css";
import { BiMessageRoundedDetail, BiMessageSquareDots } from "react-icons/bi";
import { FaUser, FaLock, FaTransgender } from "react-icons/fa";
import { MdEmail, MdSubtitles } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

export const Signup = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOK) => {
      if (isOK) {
        navigate("/signup");
      }
    });
  }
  return (
    <div className="signup">
      <div className="pik">
        <div className="start">
          <div className="text">Sign Up</div>
          <div className="line"></div>
        </div>
        <form onSubmit={formSubmitHandler}>
          {" "}
          <div className="inputss">
            <div className="rowflex">
              <div className="inputt">
                <input
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>

              <div className="inputt">
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
              <div className="inputt">
                <input
                  type="text"
                  placeholder="User Name"
                  value={uname}
                  onChange={(e) => setUName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>

              <div className="inputt">
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
              <div className="inputt">
                <input
                  type="text"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <BiMessageRoundedDetail className="icon" />
              </div>

              <div className="inputt">
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
              <div className="inputt">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <MdSubtitles className="icon" />
              </div>

              <div className="inputt">
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
              <div className="inputt">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>

              <div className="submitt-container">
                <center>
                  {" "}
                  <button type="submit" className="submitt">
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
