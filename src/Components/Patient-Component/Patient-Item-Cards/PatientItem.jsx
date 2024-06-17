import "./patientItem.css";
import React from "react";
import { Link } from "react-router-dom";

// How the patient is displayed in the surgeon's profile ( as cards )

export const PatientItem = ({ patient }) => {
  return (
    <div className="patient-item">
      <div className="patient-item-image-wrapper">
        <span>{patient?.First_Name}</span> <span>{patient?.Last_Name}</span>
        <div className="patient-info">
          <div className="info-field">
              <strong>Diagnosis:</strong>
              <p>{patient?.Diagnosis}</p>
          </div>
          <div className="info-field">
              <strong>My Notes:</strong>
              <p>{patient?.Notes}</p>
          </div>
        </div>
        <div className="patient-item-date">
          {new Date(patient?.createdAt).toDateString()}
        </div>
        <Link to={`/PatientDetails/${patient?._id}`} className="patient_profile">
          {patient?.First_Name} 's Profile
        </Link>
      </div>
    </div>
  );
};
