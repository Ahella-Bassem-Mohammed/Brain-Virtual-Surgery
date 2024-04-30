import { toast } from "react-toastify";
import "./profile.css";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import PatientList from "../../Patient-Component/PatientList";
import {patients} from "../../../dummyData"
import { UpdateProfileModel } from "../Profile/UpdateProfileModel";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom"
import { getUserProfile, uploadProfilePhoto } from "../../../redux/apiCalls/profileApiCall";


export const Profile = () => {

  const [file, setFile] = useState(null);
  const [updateProfile,setUpdateProfile]=useState(false);
  const dispatch=useDispatch();
  const{ profile }=useSelector( state => state.profile )
  const {id} = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [dispatch,id]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file !!");
    
    const formData=new FormData();
    formData.append("image",file)

    dispatch(uploadProfilePhoto(formData));

   
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
                : profile?.ProfilePhoto?.url ||
                  "C:React appsVirtualSurgeryBrainVR-mainsrcComponentsAssetsperson.png"
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
        <h1 className="profile-username"> {profile?.FirstName}</h1>
        <p className="profile-bio">{profile?.LastName}</p>
        <p className="profile-bio">{profile?.UserName}</p>
        <p className="profile-bio">{profile?.Email}</p>
        <p className="profile-bio">{profile?.Age}</p>
        <p className="profile-bio">{profile?.Gender}</p>
        <p className="profile-bio">{profile?.Title}</p>
        <p className="profile-bio">{profile?.Specialist}</p>
        <span>{new Date(profile?.createdAt).toDateString()}</span>

        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-patient-list">
        <h2 className="profile-patient-list-title">
          {" "}
          {profile?.UserName}'s patients
        </h2>
        <PatientList patients={patients} />
      </div>
      <button onClick={deleteProfileHandler} className="delete-account-btn">
        Delete Account
      </button>
      {updateProfile && (
        <UpdateProfileModel
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};
