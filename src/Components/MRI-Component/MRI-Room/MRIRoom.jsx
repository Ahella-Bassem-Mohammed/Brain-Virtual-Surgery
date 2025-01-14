import "./mriRoom.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMRI } from "../../../redux/apiCalls/mriApiCall";
import { useParams } from "react-router-dom";
import BrainViewer from "../../Brain-Viewer/BrianViewer";
import ARContainer from "../AR-Container/ARContainer";

// How the MRI is manipulated with our model
const title = [
  "Original Image Flair",
  "Ground Truth",
  "All Classes",
  "NECROTIC/CORE Predicted",
  "EDEMA Predicted",
  "ENHANCING Predicted",
];
export const MRIRoom = () => {
  const dispatch = useDispatch();
  const { mri } = useSelector((state) => state.mri || null);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleMRI(id));
  }, [dispatch, id]);

  if (!mri) return <div> ERROR </div>;

  return (
    <div className="margin">
      <div className="room-header-container">
        <div className="room-header">
          <h1>MRI-Room</h1>
          <div className="underl"></div>
        </div>
        {mri?.brainGLB && mri?.tumorGLB && <ARContainer id={id} />}
      </div>
      <div>
        {" "}
        <div className="images-container">
          {mri?.results?.map((result, index) => (
            <div>
              <span className="title">{title[index]}</span>
              <img
                style={{ width: "200px", height: "200px" }}
                src={result.secure_url}
                alt="mri"
                key={index}
              />
            </div>
          ))}{" "}
        </div>
      </div>
      <BrainViewer
        renderFile={mri.displayedNII.secure_url}
        mriId={id}
        fileName={mri.displayedNII.public_id}
      />
    </div>
  );
};
