import "./mriItem.css";
import React ,{useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import  {UpdateMRIModel}  from "../../MRI-Component/Update-MRI-Model/UpdateMRIModel";
import { /*updateMriScanDetails,*/updateMriScanImage ,deleteMriScan } from "../../../redux/apiCalls/mriApiCall";
import swal from "sweetalert";

//import { deleteMRI } from "../../../redux/apiCalls/mriApiCall";
/*-----------------------------------------------------
-------------------------------------------------------
-------------------------------------------------------
How the MRI is displyed in the Patient Details page
-------------------------------------------------------
-------------------------------------------------------
-------------------------------------------------------
 */


export const MRIItem = ({mri}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{id}=useParams();

  const [file, setFile] = useState(null);
  const [updateMRI, setUpdateMRI] = useState(false);
  //const [details, setDetails] = useState(mri?.ScanDetalies);

  // Update MRI Details Form Submit Handler
  /*const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateMriScanDetails({ ScanDetalies: details }, mri?._id));
    setUpdateMRI(false);
  };*/

  // Update MRI Image Handler
  const updateMriImageHandler = (e) => {
    e.preventDefault();
    if(!file)return toast.warning("there is no file");

    const formData = new FormData();
    formData.append("image", file);
    

    dispatch(updateMriScanImage(formData, mri?._id));
  };

  // Delete MRI Handler
  const deleteMriHandler = () => {
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this Scan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOK) => {
      if (isOK) {
        dispatch(deleteMriScan(mri?._id));
   
        navigate(`/patientdetails/${id}`);
        //window.location.reload();
      }
    });
  };

  return (
    <div className="main">
      <div>
        <strong>Image :</strong>
      </div>
      <img
        src={file ? URL.createObjectURL(file) : mri?.Image?.url}
        alt="MRI Scan"
        htmlFor="file"
        className="mri-image"
      />
      <div>
        <strong>Scan Details :</strong>
      </div>
      <p>{mri?.ScanDetalies}</p>
      <div className="patient-item-date">
        {new Date(mri?.createdAt).toDateString()}
      </div>
      <Link to={`/patientdetails/mriroom/${mri?._id}`}> MRI Room</Link>
      <div>
        <i
          onClick={() => setUpdateMRI(true)}
          className="bi bi-pencil-square"
        ></i>
        <i onClick={deleteMriHandler} className="bi bi-trash-fill"></i>

        <form onSubmit={updateMriImageHandler}>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" >
            Update
          </button>
        </form>

        {/*<form onSubmit={updateMriImageHandler}>
          <abbr title="choose MRI photo">
            <label
              htmlFor="file"
              className="bi bi-camera-fill "
            ></label>
          </abbr>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button /*className="upload-profile-photo-btn" type="submit">
            Upload
          </button>
        </form>*/}
      </div>
      {updateMRI && <UpdateMRIModel mri={mri} setUpdateMRI={setUpdateMRI} />}{" "}
      {/*<form onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            onClick={() => setUpdateMRI(false)}
            className="bi bi-x-circle-fill update-patient-form-close"
          ></i>
        </abbr>
        <h1 className="update-patient-title">Update MRI Scan Details</h1>
        <input
          type="text"
          placeholder="Scan Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></input>

        <button type="submit"> Update</button>
  </form>*/}
    </div>
  );
}
