import { toast } from "react-toastify";
import "./profile.css";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
/*import PatientList from "../../pages/Patient/PatientList";
import {patient} from "../../dummyData"*/

export const Profile = () => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file !!");

    console.log("image uploaded");
  };

  const deleteProfileHandler=()=>{
    swal({
      title:"Are you sure?",
      text:"you will not be able to recover your profile",
      icon:"warning",
      buttons:true,
      dangerMode:true,
    }).then((willDelete)=>{
      if(willDelete){
        swal("account has been deleted",{
          icon:"success",
        });
      }else{
        swal("something went wrong !!")
      }
    });
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "../../Assets/doctor avatar.jpeg"
            }
            alt="Profile "
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="upload-profile-photo-btn" type="submit">
              Upload
            </button>
          </form>
        </div>
        <h1 className="profile-username"> Ahella</h1>
        <p className="profile-bio">hello my name is ahella</p>
        <div className="user-date-joined">
          <strong> Date Joined:</strong>
          <span> 6/4/2024</span>
        </div>
        <button className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-patient-list">
        <h2 className="profile-patient-list-title"> Ahella's patients</h2>
        {/*<PatientList patients={patients}/>*/}
      </div>
      <button onClick={deleteProfileHandler} className="delete-account-btn">
        Delete Account
      </button>
    </section>
  );
};
