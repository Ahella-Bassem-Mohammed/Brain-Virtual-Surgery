import "./updateMriModel.css"
import {useState} from "react";
import { useDispatch } from "react-redux";

import { updateMriScanDetails } from "../../../redux/apiCalls/mriApiCall";

export const UpdateMRIModel=({setUpdateMRI,mri})=>{
    
    const dispatch=useDispatch();
    const [details,setDetails]=useState(mri?.ScanDetalies);
    

    // Update MRI Details Form Submit Handler
    const formSubmitHandler=(e)=>{
        e.preventDefault();

        dispatch(updateMriScanDetails({ScanDetalies:details},mri?._id));
        setUpdateMRI(false);
    }
    return (
      <div className="update-MRI">
        <form onSubmit={formSubmitHandler} className="update-MRI-form">
          <abbr title="close">
            <i
              onClick={() => setUpdateMRI(false)}
              className="bi bi-x-circle-fill update-MRI-form-close"
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
        </form>
      </div>
    );
}
 