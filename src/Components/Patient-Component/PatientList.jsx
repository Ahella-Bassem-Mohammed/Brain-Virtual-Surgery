import "./patient.css";
import React ,{useEffect}from "react";
import { PatientItem } from "./PatientItem";
import { useSelector, useDispatch } from "react-redux";
import { patientActions } from "./patientSlice";


const PatientList = (/*{ patients }*/) => {

   const patients = useSelector((state) => state.patient.patients);
   const dispatch = useDispatch();

   useEffect(() => {
     // Simulated data fetching (e.g., from API)
     const fetchedPatients = [
       /* Simulated array of patients */
     ];
     dispatch(patientActions.setPatients(fetchedPatients));
   }, [dispatch]);

 
  return (
    <div className="patient-list-container">
      {patients && patients.length > 0 ? (
        patients.map((patient) => (
          <PatientItem key={patient._id} patient={patient} />
        ))
      ) : (
        <div className="no-items-message">No patients available</div>
      )}
    </div>
  );
};

export default PatientList;
     
      