import "./profile.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../../redux/apiCalls/profileApiCall";
import { getAllPatients } from "../../../redux/apiCalls/patientApiCall";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import {PatientList} from "../../Patient-Component/Patient-Item-Cards/PatientList"
import { UpdateProfileModel } from "../Profile/UpdateProfileModel";
import swal from "sweetalert";
import { Oval } from "react-loader-spinner";



export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const patients = useSelector((state) => state.patient.patients || []);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getAllPatients())
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // Upload profile photo Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file !!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Profile (Account) Form Submit Handler
  const deleteProfileHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover your profile",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  
  if (loading) {
    return (
      <div >
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
      </div>
    );
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
        {patients && patients.length > 0 ? (
          <PatientList patients={patients} />
        ) : (
          <div className="no-items-message">No patients available</div>
        )}

        
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
      <Link to={"/addpatient"}> Add Patient</Link>
    </section>
  );
};
