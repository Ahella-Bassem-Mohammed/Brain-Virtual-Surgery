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
    {/* --------------------------------------patient details--------------------------------------- */}
      <div>{patient?.First_Name}</div>
      <div>{patient?.Last_Name}</div>
      <div>{patient?.Gender}</div>
      <div> {patient?.Age} </div>
      <div> {patient?.Risk_Factors_And_Life_Style} </div>
      <div> {patient?.Family_History} </div>
      <div> {patient?.Neurological_Examination} </div>
      <div> {patient?.Symptoms} </div>
      <div> {patient?.Treatment_History} </div>
      <div> {patient?.Allergies} </div>
      <div> {patient?.Duration_And_Progression_Of_Symptoms} </div>
      <div> {patient?.Diagnosis} </div>
      <div> {patient?.Medical_History} </div>
      <div> {patient?.Biopsy_Or_Pathology_Results} </div>
      <div> {patient?.Lab_Test_Result} </div>
      <div> {patient?.Current_Medications} </div>
      <div> {patient?.Notes} </div>

      <span>{new Date(patient?.createdAt).toDateString()}</span>
    {/* -------------------------------------------------------------------------------------- */}

    {/* -----------------update patient icons---------------------------------- */}

      <div className="update-patient-icons">
        <i
          onClick={() => setUpdatePatient(true)}
          className="bi bi-pencil-square"
        ></i>
        
        <i onClick={deletePatientHandler} className="bi bi-trash-fill"></i>
      </div>

    {/*------------------------------------------------------------------------- */}

    {/*------------------- update patient component , add MRI component and MRI list for this patient included */}
      {updatePatient && (
        <UpdatePatientModel
          patient={patient}
          setUpdatePatient={setUpdatePatient}
        />
      )}

      {mris && mris.length > 0 ? (
        <MRIList mris={mris} />
      ) : (
        <div className="no-items-message">No MRI Scans available</div>
      )}
      
      <AddMRI />
    </div>
  );
}
