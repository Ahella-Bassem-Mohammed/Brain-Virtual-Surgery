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
import { getAllPatients, getPatientsCount } from "../../../redux/apiCalls/patientApiCall";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import {PatientList} from "../../Patient-Component/Patient-Item-Cards/PatientList"
import { UpdateProfileModel } from "../Profile/UpdateProfileModel";
import swal from "sweetalert";
import { Oval } from "react-loader-spinner";
import { UserContext } from "../../UserContext";
import { useContext } from "react";


export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userc} =useContext(UserContext);
  const {age}=calculateAge(userc?.birthdate);
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  

  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const patients = useSelector((state) => state.patient.patients || []);
  const { patientsCount } = useSelector((state) => state.patient);

  const { id } = useParams();

 
  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getAllPatients())
    window.scrollTo(0, 0);
  }, [dispatch, id]);
  
  useEffect(()=>{
    dispatch(getPatientsCount())

  },[dispatch])

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
        <div className="patient-infoo">
          <div className="infoo-field">
            <strong>First Name:</strong>
            <p className="profile-username"> {profile?.FirstName}</p>
          </div>
          <div className="infoo-field">
            <strong>Last Name:</strong>
            <p className="profile-bio">{profile?.LastName}</p>
          </div>
          <div className="infoo-field">
            <strong>User Name:</strong>
            <p className="profile-bio">{profile?.UserName}</p>
          </div>
          <div className="infoo-field">
            <strong>BirthDate:</strong>
            <p className="profile-bio">
              {new Date(profile?.Birthdate).toDateString()}
            </p>
          </div>
          <div className="infoo-field">
            <strong>Age:</strong>
            <p className="profile-bio">{age}</p>
          </div>
          <div className="infoo-field">
            <strong>Gender:</strong>
            <p className="profile-bio">{profile?.Gender}</p>
          </div>
          <div className="infoo-field">
            <strong>Title:</strong>
            <p className="profile-bio">{profile?.Title}</p>
          </div>
          <div className="infoo-field">
            <strong>Specialist:</strong>
            <p className="profile-bio">{profile?.Specialist}</p>
          </div>
          <div className="infoo-field">
            <strong>Email:</strong>
            <p className="profile-bio">{profile?.Email}</p>
          </div>
        </div>
        <span className="user-date-joined">
          {new Date(profile?.createdAt).toDateString()}
        </span>

        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
        <Link to={"/addpatient"} className="add_patient">
          {" "}
          Add Patient
        </Link>
        <button onClick={deleteProfileHandler} className="delete-account-btn">
          Delete Account
        </button>
      </div>
      <div className="profile-patient-list">
        <h6 className="profile-patient-list-title">
          {" "}
          {profile?.UserName}'s patients
        </h6>
        <h3 className="patient"> You have {patientsCount} Patients </h3>
        {patients && patients.length > 0 ? (
          <PatientList patients={patients} />
        ) : (
          <div className="no-items-message">No patients available</div>
        )}
      </div>

      {updateProfile && (
        <UpdateProfileModel
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};
