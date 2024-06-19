import "./patientDetails.css"
import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { MRIList } from "../../MRI-Component/MRI-Item/MRIList";
import { AddMRI } from "../../MRI-Component/Add-MRI/AddMRI";
import { UpdatePatientModel } from "../Update-Patient-Model/UpdatePatientModel";
import {
  getAllMRI,
} from "../../../redux/apiCalls/mriApiCall";
import { getSinglePatient } from "../../../redux/apiCalls/patientApiCall";
import { deletePatient } from "../../../redux/apiCalls/patientApiCall";



import swal from "sweetalert";

 




export const PatientDetails = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { patient } = useSelector(state => state.patient);
  const {user}=useSelector(state=>state.auth)
  const {mris} = useSelector((state) => state.mri || []);
  /*const { mris } = useSelector((state) => ({
    mris: state.mri.mris || [], // Providing a default value if loadingg is undefined
  }));*/
  const { id } = useParams();
  

  const [updatePatient, setUpdatePatient] = useState(false);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSinglePatient(id));
    dispatch(getAllMRI(id))
  }, [dispatch, id]);

 

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
    <div className="patient-details-body"> 

    <div className="head-mri">
    <h1>Patient Information</h1>
    <div className="underln"></div>
    </div>
    {/* --------------------------------------patient details--------------------------------------- */}
      <div className="wrappin">
        <div className="patient_details">
          <div className="info-field">
            <strong>First Name:</strong>
            <p>{patient?.First_Name}</p>
          </div>

          <div className="info-field">
            <strong>Last Name:</strong>
            <p>{patient?.Last_Name}</p>
          </div>

          <div className="info-field">
            <strong>Gender:</strong>
            <p>{patient?.Gender}</p>
          </div>

          <div className="info-field">
            <strong>Age:</strong>
            <p>{patient?.Age}</p>
          </div>
        </div>
        
        <div className="patient_detailss">
          <div className="info-field">
          <strong>Notes:</strong>
          <p>{patient?.Notes}</p>
        </div>
        
        <span className="datte"> <strong>Joined Date:</strong>{new Date(patient?.createdAt).toDateString()}</span>

        {/* -------------------------------------------------------------------------------------- */}

        {/* -----------------update patient icons---------------------------------- */}

          <div className="update-patient-icons">
            <div className="up-patient">
              <i onClick={() => setUpdatePatient(true)} className="bi bi-pencil-square">Update</i>
            </div>
            <div className="del-patient">
              <i onClick={deletePatientHandler} className="bi bi-trash-fill">Delete</i>
            </div>
          </div>

        {/*------------------------------------------------------------------------- */}

                 
        </div>
      </div>

      <div className="patient_detailsss">

        <div className="info-field">
          <strong>Allergies:</strong>
          <p>{patient?.Allergies}</p>
        </div>

        <div className="info-field">
          <strong>Diagnosis:</strong>
          <p>{patient?.Diagnosis}</p>
        </div>

        <div className="info-field">
          <strong>Symptoms:</strong>
          <p>{patient?.Symptoms} </p>
        </div>

        <div className="info-field">
          <strong>Risk Factors:</strong>
          <p>{patient?.Risk_Factors_And_Life_Style}</p>
        </div>


      <div className="info-field">
            <strong>Family History:</strong>
            <p>{patient?.Family_History}</p>
      </div> 

      <div className="info-field">
          <strong>Lab Test Result:</strong>
          <p>{patient?.Lab_Test_Result} </p>
        </div>

        <div className="info-field">
          <strong>Medical History:</strong>
          <p>{patient?.Medical_History} </p>
        </div>

        <div className="info-field">
          <strong>Pathology Results:</strong>
          <p>{patient?.Biopsy_Or_Pathology_Results} </p>
        </div>

        <div className="info-field">
          <strong>Treatment History:</strong>
          <p>{patient?.Treatment_History}</p>
        </div>

        <div className="info-field">
          <strong>Current Medications:</strong>
          <p>{patient?.Current_Medications}</p>
        </div>
        
        <div className="info-field">
          <strong>Duration Of Symptoms:</strong>
          <p>{patient?.Duration_And_Progression_Of_Symptoms}</p>
        </div>

        <div className="info-field">
          <strong>Neurological Examination:</strong>
          <p>{patient?.Neurological_Examination}</p>
        </div>
        
        
      </div>
   

    {/*------------------- update patient component , add MRI component and MRI list for this patient included */}
      
        {updatePatient && (
          <UpdatePatientModel
            patient={patient}
            setUpdatePatient={setUpdatePatient}
          />
        )}
      

      <div className="mri-container">
        {mris && mris.length > 0 ? (
          <MRIList mris={mris} />
        ) : (
          <div className="no-items-message">No MRI Scans available</div>
        )}
        
        <div className="mr">
          <AddMRI />
        </div>
      </div>
    </div>
  );
}
