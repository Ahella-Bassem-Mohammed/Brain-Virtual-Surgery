import "./about.css";
import React from "react";
export const About = () => {
  return (
    <div className="about">
      <div className="problem">
        <div className="right">
          <h2>Problem</h2>
          <hr></hr>
          <p>
            The problem that we seek<br></br> to solve concerns the field of
            surgery.<br></br>
            Sometimes it is not enough for doctors,<br></br>Especially those in
            the last years of study,<br></br>
            to just Look at MRI Scans Image,<br></br> Rather it requires more
            details to do a Surgery.
          </p>
        </div>
        <div className="solution">
          <h2>Solution</h2>
          <hr></hr>
          <p>
            Developing the Medical Performance<br></br>
            Between the Doctor and MRI Scans,<br></br>
            As it Helps the Doctor Interact <br></br>
            With the organ to Avoid Risks that <br></br>
            may Occur during the Surgical Procedure.
          </p>
        </div>
      </div>
    </div>
  );
};
