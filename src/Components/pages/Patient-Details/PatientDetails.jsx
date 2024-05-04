import "./patientdetails.css"
import React,{useEffect, useState} from 'react'
import { MRIscans/*,patients*/ } from "../../../dummyData";
import{useParams,Link,useNavigate} from "react-router-dom";
import { UpdatePatientModel } from "./UpdatePatientModel";
import swal from "sweetalert";
import { useDispatch,useSelector } from "react-redux";
import {  fetchSinglePatient } from "../../../redux/apiCalls/patientApiCall";
//import{fetchSingleMRI} from "../../../redux/apiCalls/mriApiCall";
import { deletePatient } from "../../../redux/apiCalls/patientApiCall";
/*import { toast } from "react-toastify";
import { updateMriScan } from "../../../redux/apiCalls/mriApiCall";
*/
 




export const PatientDetails = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { patient } = useSelector((state) => state.patient);
  //const { mri } = useSelector((state) => state.mri);
  const {user}=useSelector((state)=>state.auth)
  
  //const [file, setFile] = useState(mri.Image);

  const { id } = useParams();
  const mri =MRIscans.find((m) => m._id === parseInt(id))
  //const patient = patients.find((p) => p._id === parseInt(id));

  const [updatePatient, setUpdatePatient] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePatient(id));
    //dispatch(fetchSingleMRI(id));
  }, [dispatch, id]);

  // Update mri Handler
  /*const updateMriHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateMriScan(formData, mri?._id));
  };*/

  // Delete patient Handler
  const deletePatientHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this patient",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOK) => {
      if (isOK) {
        dispatch(deletePatient(patient?._id));
        navigate(`/profile/${user?._id}`);
        
      } 
    });
  };

  return (
    <div className="margin">
      <div>{mri?.Patient.First_Name}</div>
      <div>{mri?.Patient.Gender}</div>

      <strong>Image :</strong>
      <p>{mri?.Image}</p>
      <Link to={`/patientdetails/mriroom/${mri?._id}`}>
        {mri?.ScanDetails}
      </Link>
      <span>{new Date(patient?.createdAt).toDateString()}</span>

      <div>
        <i
          onClick={() => setUpdatePatient(true)}
          className="bi bi-pencil-square"
        ></i>
        <i onClick={deletePatientHandler} className="bi bi-trash-fill"></i>
      </div>
      {updatePatient && (
        <UpdatePatientModel
          patient={patient}
          setUpdatePatient={setUpdatePatient}
        />
      )}
      {/*<form onSubmit={updateMriHandler}>
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
      </form>*/}
    </div>
  );
}
