import "./addMri.css"
import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadMriScan } from "../../../redux/apiCalls/mriApiCall";
import { RotatingLines } from "react-loader-spinner";

// Separeted addtion of MRI from the Add Patient page 


export const AddMRI = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  //const { loading, isMriScanUploaded } = useSelector((state) => state.mri);
  const { loading } = useSelector((state) => ({
    loading: state.loadingg || false, // Providing a default value if loadingg is undefined
  }));
  const { isMriScanUploaded } = useSelector((state) => ({
  isMriScanUploaded: state.isMriScanUploaded || false, // Providing a default value if loadingg is undefined
  }));
  const [file, setFile] = useState(null);

  // Upload MRI Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Image", {Image:file});
    dispatch(uploadMriScan(formData));
  };

  useEffect(() => {
    if (isMriScanUploaded) {
      toast.success("MRI uploaded successfully ");
      //navigate("/addpatient");
    }
  }, [isMriScanUploaded /*, navigate*/]);

  return (
    <div>
      {/*<img
        src={file ? URL.createObjectURL(file) : mri?.Image?.url || ""}
        alt="MRI "
        className="MRI-image"
      />*/}
      <form onSubmit={formSubmitHandler}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

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
            "Add MRI"
          )}
        </button>
      </form>
    </div>
  );
}
