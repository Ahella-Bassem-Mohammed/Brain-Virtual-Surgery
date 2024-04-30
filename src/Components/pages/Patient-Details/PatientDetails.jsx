import "./patientdetails.css"
import React,{useEffect, useState} from 'react'
import { MRIscans,patients } from "../../../dummyData";
import{useParams,Link} from "react-router-dom";
import { UpdatePatientModel } from "./UpdatePatientModel";
import swal from "sweetalert";


 




export const PatientDetails = () => {

  
  const {id} =useParams();
  const mri=MRIscans.find(m=>m._id===parseInt(id))
  const patient = patients.find((p) => p._id === parseInt(id));

  const [updatePatient,setUpdatePatient]=useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delete patient
   const deletePatientHandler = () => {
     swal({
       title: "Are you sure?",
       text: "you will not be able to recover this patient",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     }).then((willDelete) => {
       if (willDelete) {
         swal("patient has been deleted", {
           icon: "success",
         });
       } else {
         swal("something went wrong !!");
       }
     });
   };
  // Update patient


  return (

    
    <div className="margin">
      <span>{mri.Patient.First_Name}</span>
      <span>{mri.Patient.Gender}</span>

      <strong>Image :</strong>
      <p>{mri.Image}</p>
      <Link to={`/patientdetails/mriroom/${mri._id}`}>{mri.ScanDetails}</Link>
      <span>{patient.createdAt}</span>

      <div>
        <i onClick={()=>setUpdatePatient(true)} className="bi bi-pencil-square"></i>
        <i onClick={deletePatientHandler} className="bi bi-trash-fill"></i>
      </div>
      {updatePatient && <UpdatePatientModel mri={mri} patient={patient} setUpdatePatient={setUpdatePatient} />}
    </div>
  );
}
