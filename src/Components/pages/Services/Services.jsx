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
              First Import MRI Scan and Segment the Target Orgen from the Whole
              Body using Deep Learning.
            </p>
          </div>
          <div className="compo">
            <h3>3D Model</h3>
            <p>
              Then, We Convert Segmented Organ to 3D Model that contain of set
              of Points.
            </p>
          </div>
          <div className="compo">
            <h3>Triangulation</h3>
            <p>
              After that we can Convert Points of 3D Model of Organ to set of
              Triangulation.
            </p>
          </div>
          <div className="compo">
            <h3>Cutting</h3>
            <p>Then, Cut any Part of 3D Model and Perform Basic Surgery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
