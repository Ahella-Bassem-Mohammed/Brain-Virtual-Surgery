import "./services.css";
import React from "react";


export const Services = () => {
  return (
    <div>
      <div className="features">
        <div className="top">
          <h2>Our Features</h2>
          <hr></hr>
        </div>
        <div className="conten">
          <div className="compo">
            <h3>Segmantation</h3>
            <p>
              First, upload MRI files and segment the target organ using U-NET
              model and display the 6 outputs.
            </p>
          </div>
          <div className="compo">
            <h3>3D Viewer</h3>
            <p>
              Then, convert the segmented organ to a 3D model that contains a
              set of points and applies more features to it.
            </p>
          </div>
          <div className="compo">
            <h3>Volume Size</h3>
            <p>
              After that based on the identification of a specific threshold, we
              calculate the size of the tumor.
            </p>
          </div>
          <div className="compo">
            <h3>Augmented Reality</h3>
            <p>
              Finally, By scanning the QR code using your mobile phone, you can
              see the brain 3D in your environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
