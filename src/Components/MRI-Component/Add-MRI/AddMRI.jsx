import "./addMri.css"
import React, { useState, useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uploadMriScan } from "../../../redux/apiCalls/mriApiCall";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

// Separeted addtion of MRI from the Add Patient page 


export const AddMRI = () => {

  const fileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.mri);
  const { isMriScanUploaded } = useSelector((state) => ({
    isMriScanUploaded: state.isMriScanUploaded || false, // Providing a default value if loadingg is undefined
  }));

  const [files, setFiles] = useState([]);
  const { id } = useParams();

  // Creating an Array of Files
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const newFiles = Array.from(fileList);
    setFiles(newFiles);
  };

  // Upload MRI Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`file`, file);
    });
    formData.append("patientId", id);
    dispatch(uploadMriScan(formData, id));
  };

  useEffect(() => {
    if (isMriScanUploaded) {
      toast.success("MRI uploaded successfully ");
    }
  }, [isMriScanUploaded, navigate]);
  const openFileSelection = () => {
    fileRef.current.click();
  };

  const shrinkString = (originStr, maxChars, trailingCharCount) => {
    let shrinkedStr = originStr;
    const shrinkedLength = maxChars - trailingCharCount - 3;
    if (originStr.length > shrinkedLength) {
      const front = originStr.substr(0, shrinkedLength);
      const mid = "...";
      const end = originStr.substr(-trailingCharCount);
      shrinkedStr = front + mid + end;
    }

    return shrinkedStr;
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className="ch-file">
          <div onClick={openFileSelection} class="custom-file-upload">
            <label>
              {files.length > 0 ? "Selected Files: " : "Choose Files"}
            </label>
            {files.length === 1 && (
              <span title={files[0].name}>
                {shrinkString(files[0].name, 13, 7)}
              </span>
            )}
            {files.length > 1 && (
              <span
                title={files.reduce(
                  (acc, curr) => `${acc?.name || acc}\n${curr.name}`
                )}
              >
                {files.length} files
              </span>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            multiple
            name="file"
            id="mri-file"
            onChange={handleFileChange}
          />

          <button type="submit" className="button-file">
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
        </div>
      </form>
    </div>
  );
}
