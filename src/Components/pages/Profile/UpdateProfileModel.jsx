import "./updateProfileModel.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/apiCalls/profileApiCall";



export const UpdateProfileModel = ({ setUpdateProfile, profile }) => {

  const dispatch = useDispatch();

  const [fname, setFname] = useState(profile.FirstName);
  const [lname, setLname] = useState(profile.LastName);
  const [username, setUsername] = useState(profile.UserName);
  const [email, setEmail] = useState(profile.Email);
  const [birthdate, setBirthDate] = useState(profile?.Birthdate);
  const [gender, setGender] = useState(profile.Gender);
  const [specialist, setSpecialist] = useState(profile.Specialist);
  const [title, setTitle] = useState(profile.Title);
  const [password, setPassword] = useState("");

  

  // Update Profile Form Submit Handler

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = {
      FirstName: fname,
      LastName: lname,
      UserName: username,
      Email: email,
      Birthdate:birthdate,
      Gender: gender,
      Specialist: specialist,
      Title: title,
    };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Profile</h1>
        <div className="undeln"></div>
        <div className="elements">
          <input
            className="put"
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="put"
            type="date"
            placeholder="BirthDate"
            value={birthdate}
            onChange={(e) => setBirthDate(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            className="put"
            type="text"
            placeholder="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          ></input>
          <input
            className="put"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="submt">
            {" "}
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};
