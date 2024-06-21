import "./mriItem.css";
import React ,{useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";
import { /*updateMriScanDetails,updateMriScanImage ,*/deleteMriScan } from "../../../redux/apiCalls/mriApiCall";
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

  const [file/*, setFile*/] = useState(null);
  const [/*updateMRI,*/ setUpdateMRI] = useState(false);
  //const [details, setDetails] = useState(mri?.ScanDetalies);

  // Update MRI Details Form Submit Handler
  /*const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateMriScanDetails({ ScanDetalies: details }, mri?._id));
    setUpdateMRI(false);
  };*/

  // Update MRI Image Handler
  /*const updateMriImageHandler = (e) => {
    e.preventDefault();
    if(!file)return toast.warning("there is no file");

    const formData = new FormData();
    formData.append("image", file);
    

    dispatch(updateMriScanImage(formData, mri?._id));
  };*/

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
      
      <img
        src={file ? URL.createObjectURL(file) : mri?.thumbnail?.secure_url}
        alt="MRI Scan"
        htmlFor="file"
        className="mri-image"
      />
      <div className="details">
        <strong>Scan Details :</strong>
      </div>
      <p>{mri?.ScanDetalies}</p>
      <div className="patient-item-date">
        {new Date(mri?.name).toDateString()}
      </div>
      <Link className="mri-button" to={`/patientdetails/mriroom/${mri?._id}`}> MRI Room</Link>
      <div className="update-patient-iconss">
      <div className="up-mri">
        <i onClick={() => setUpdateMRI(true)} className="bi bi-pencil-square">Update</i>
      </div>
      <div className="del-mri">
        <i onClick={deleteMriHandler} className="bi bi-trash-fill">Delete</i> 
      </div>   
      </div>
    </div>
  );
}
