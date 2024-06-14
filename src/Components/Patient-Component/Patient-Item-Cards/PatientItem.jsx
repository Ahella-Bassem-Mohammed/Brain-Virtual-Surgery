import "./patientItem.css";
import React from "react";
import { Link } from "react-router-dom";

// How the patient is displayed in the surgeon's profile ( as cards )

export const PatientItem = ({ patient }) => {
  return (
    <div className="patient-item">
      <div className="patient-item-image-wrapper">
        <h1>{patient?.First_Name}</h1> <span>{patient?.Last_Name}</span>
        <div className="patient-item-date">
          {new Date(patient?.createdAt).toDateString()}
        </div>
        <strong>Diagnosis :</strong>
        <p>{patient?.Diagnosis}</p>
        <strong>My Notes :</strong>
        <p>{patient?.Notes}</p>
        <Link to={`/PatientDetails/${patient?._id}`}>
          {patient?.First_Name} 's Profile
        </Link>
      </div>
    </div>
  );
};
