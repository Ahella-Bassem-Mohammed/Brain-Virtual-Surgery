import React, { useState } from "react";
import "./update-patient-model.css";
import { toast } from "react-toastify";

export const UpdatePatientModel = ({ setUpdatePatient, patient, mri }) => {
  const [fname, setFname] = useState(patient.First_Name);
  const [lname, setLname] = useState(patient.Last_Name);
  const [gender, setGender] = useState(patient.Gender);
  const [age, setAge] = useState(patient.Age);
  const [risk, setRisk] = useState(patient.Risk_Factors_And_Life_Style);
  const [familyhistory, setFamilyhistory] = useState(patient.Family_History);
  const [neuro, setNeuro] = useState(patient.Neurological_Examination);
  const [symptoms, setSymptoms] = useState(patient.Symptoms);
  const [treatmenthistory, setTreatmenthistory] = useState(
    patient.Treatment_History
  );
  const [allergies, setAllergies] = useState(patient.Allergies);
  const [duration, setDuration] = useState(
    patient.Duration_And_Progression_Of_Symptoms
  );
  const [diagnosis, setDiagnosis] = useState(
    patient.Diagnosis
  );
  const [medicalhistory, setMedicalhistory] = useState(patient.Medical_History);
  const [biopsy, setBiopsy] = useState(patient.Biopsy_Or_Pathology_Results);
  const [labtestresult, setLabtestresult] = useState(patient.Lab_Test_Result);
  const [currentmedications, setCurrentmedications] = useState(
    patient.Current_Medications
  );
  const [notes, setNotes] = useState(patient.Notes);
  const [file, setFile] = useState(mri.Image);

  // Update Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if(fname.trim() === "") return toast.error("First name is required !!");
    if(lname.trim() === "") return toast.error("Last name is required !!");
    if(gender.trim() === "") return toast.error("Gender is required !!");
    if(age.trim() === "") return toast.error("Age is required !!");
    if(file) return console.log("Image uploaded");
  };

  return (
    <div className="update-patient">
      <form onClick={formSubmitHandler} className="update-patient-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePatient(false)}
            className="bi bi-x-circle-fill update-patient-form-close"
          ></i>
        </abbr>
        <h1 className="update-patient-title">Update Patient</h1>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Gender "
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Risk Factors and Life Style"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Family History"
          value={familyhistory}
          onChange={(e) => setFamilyhistory(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Neurological_Examination"
          value={neuro}
          onChange={(e) => setNeuro(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Treatment_History"
          value={treatmenthistory}
          onChange={(e) => setTreatmenthistory(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Duration_And_Progression_Of_Symptoms"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Medical_History"
          value={medicalhistory}
          onChange={(e) => setMedicalhistory(e.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Biopsy_Or_Pathology_Results"
          value={biopsy}
          onChange={(e) => setBiopsy(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Lab_Test_Result"
          value={labtestresult}
          onChange={(e) => setLabtestresult(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Current_Medications"
          value={currentmedications}
          onChange={(e) => setCurrentmedications(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></input>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        ></input>
        <button type="submit"> Update</button>
      </form>
    </div>
  );
};
