import "./mriItem.css";
import React ,{useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteMriScan } from "../../../redux/apiCalls/mriApiCall";
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

  const [file] = useState(null);
  



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
      <div className="del-mri">
        <i onClick={deleteMriHandler} className="bi bi-trash-fill">Delete</i> 
      </div>   
      </div>
    </div>
  );
}
