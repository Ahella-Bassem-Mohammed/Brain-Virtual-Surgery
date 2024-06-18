import "./addMri.css"
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uploadMriScan } from "../../../redux/apiCalls/mriApiCall";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

// Separeted addtion of MRI from the Add Patient page 


export const AddMRI = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  const { loading } = useSelector((state) => 
  ({
        loading: state.loading|| false, // Providing a default value if loadingg is undefined
  }));
  const { isMriScanUploaded } = useSelector((state) =>
  ({
        isMriScanUploaded: state.isMriScanUploaded || false, // Providing a default value if loadingg is undefined
  }));
  
  
  
  const [files, setFiles] = useState([]);
  const{id}=useParams();

  // Creating an Array of Files 
   const handleFileChange = (e) => {
     const fileList = e.target.files;
     const newFiles = Array.from(fileList);
     setFiles([...files, ...newFiles]);
   };
   
  // Upload MRI Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`file`, file);
    });
    formData.append("patientId",id)
    dispatch(uploadMriScan(formData));
    

   
  };

  useEffect(() => {
    if (isMriScanUploaded) {
      toast.success("MRI uploaded successfully ");
    }
  }, [isMriScanUploaded ,navigate]);

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        
        <input
          type="file"
          multiple
          name="file"
          id="file"
          onChange={handleFileChange}
        />{" "}
        
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
