import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../../redux/apiCalls/patientApiCall";
import { RotatingLines } from "react-loader-spinner";


export const AddPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isPatientAdded } = useSelector((state) => state.patient);
/*  const { user } = useSelector((state) => state.auth);*/

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [risk, setRisk] = useState("");
  const [familyhistory, setFamilyhistory] = useState("");
  const [neuro, setNeuro] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [treatmenthistory, setTreatmenthistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const [duration, setDuration] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicalhistory, setMedicalhistory] = useState("");
  const [biopsy, setBiopsy] = useState("");
  const [labtestresult, setLabtestresult] = useState("");
  const [currentmedications, setCurrentmedications] = useState("");
  const [notes, setNotes] = useState("");
 
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

  
  // Add Patient Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (fname.trim() === "") return toast.error("First name is required !!");
    if (lname.trim() === "") return toast.error("Last name is required !!");
    if (gender.trim() === "") return toast.error("Gender is required !!");
    if (age.trim() === "") return toast.error("Age is required !!");
    

    

    const formData = new FormData();
    formData.append("First name", fname);
    formData.append("Last name", lname);
    formData.append("Gender", gender);
    formData.append("Age", age);
    formData.append("Risk_Factors_And_Life_Style", risk);
    formData.append("Family_History", familyhistory);
    formData.append("Neurological_Examination", neuro);
    formData.append("Symptoms", symptoms);
    formData.append("Treatment_History", treatmenthistory);
    formData.append("Allergies", allergies);
    formData.append("Duration_And_Progression_Of_Symptoms", duration);
    formData.append("Diagnosis", diagnosis);
    formData.append("Medical_History", medicalhistory);
    formData.append("Biopsy_Or_Pathology_Results", biopsy);
    formData.append("Lab_Test_Result", labtestresult);
    formData.append("Current_Medications", currentmedications);
    formData.append("Notes", notes);

    
    
    dispatch(addPatient(formData));
  };

  useEffect(() => {
    if(isPatientAdded) {
    navigate(/*`/profile/${user?._id}`*/"/");
    }
  }, [isPatientAdded, navigate/*,user*/]);

  return (
    <div className="margin">
      <h1>Add New Patient</h1>
      <form onSubmit={formSubmitHandler}>
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
        {/*<input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
  ></input>*/}
       {/* <img
          src={
            file
              ? URL.createObjectURL(file)
              : mri?.Image?.url ||
                "C:React appsVirtualSurgeryBrainVR-mainsrcComponentsAssetsperson.png"
          }
          alt="MRI Scan"
          className="profile-image"
        />
        <form onSubmit={mriFormSubmitHandler}>
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
        <button type="submit">
          {" "}
          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Add Patient"
          )}
        </button>
      </form>
    </div>
  );
};
