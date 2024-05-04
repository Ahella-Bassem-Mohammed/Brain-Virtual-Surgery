import { toast } from "react-toastify";
import "./profile.css";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
//import PatientList from "../../Patient-Component/PatientList";
import { PatientItem } from "../../Patient-Component/PatientItem";
//import {patients} from "../../../dummyData"

import { UpdateProfileModel } from "../Profile/UpdateProfileModel";
import {useDispatch,useSelector} from "react-redux";
import {useParams,useNavigate} from "react-router-dom"
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../../redux/apiCalls/profileApiCall";
import { Link } from "react-router-dom";
import {Oval} from "react-loader-spinner";
import{logoutUser} from "../../../redux/apiCalls/authApiCall";

export const Profile = () => {

  const [file, setFile] = useState(null);
  const [updateProfile,setUpdateProfile]=useState(false);
  const dispatch=useDispatch();
  const{ profile,loading,isProfileDeleted }=useSelector( state => state.profile )
  const {id} = useParams();
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate();
  const patients = useSelector((state) => state.patient.patients);
  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [dispatch,id]);

  useEffect(() => {
     if(isProfileDeleted){
      navigate("/")
     }
   }, [navigate, isProfileDeleted]);

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
    }).then((isOk)=>{
      if(isOk){
        dispatch(deleteProfile(user?._id))
        dispatch(logoutUser());
      

      }
    });
  };
  if(loading){
    return(
    <div>
        <Oval 
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="grey"
          strokeWidth={3}
          strokeWidthSecondary={3}
          />
    </div>)
  }
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
        {patients && patients.length > 0 ? 
        (profile?.patients?.map((patient) => (
          <PatientItem
            key={patient._id}
            patient={patient}
            username={profile?.UserName}
            userId={profile?._id}
          />
        ))):( <div className="no-items-message">No patients available</div>)}
        
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
      <Link to="/addpatient"> Add Patient</Link>
    </section>
  );
};
