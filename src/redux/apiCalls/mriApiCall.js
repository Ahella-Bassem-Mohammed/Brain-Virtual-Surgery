import { mriActions } from "../slices/mriSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";




// Get All MRI Scans
export function getAllMRI(patientId) {
  return async (dispatch, getState) => {
    
    try {
      const { data } = await request.get(
        `api/files/patient/${patientId}`,
        {
          headers: {
            token: getState().auth.user.token,
          },
        }
      );
     
      dispatch(mriActions.setMris(data));
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch MRIs");
      }
    }
  };
}

// Get Single MRI Scan Details
export function getSingleMRI(mriId) {
  return async (dispatch, getState) => {
    try {
      
      const { data } = await request.get(
        `/api/files/${mriId}`,
        {
          headers: {
            token: getState().auth.user.token,
          },
        }
      );

      dispatch(mriActions.setMriScan(data));
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to get MRI Scan ");
      }
    }
  };
}


// Upload MRI Scan
export function uploadMriScan(MRIScan) {
  return async (dispatch, getState) => {
    try {
      dispatch(mriActions.setLoading());

      await request.post(`/api/files/`, MRIScan, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(mriActions.setIsMriScanUploaded());
      setTimeout(() => dispatch(mriActions.clearIsMriScanUploaded()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mriActions.clearLoading());
    }
  };
}

// Update MRI Scan Image
export function updateMriScanImage(newScan, mriId) {
  return async (getState) => {
    try { 
      console.log(newScan)
      console.log(mriId)
      await request.put(`/api/mriscan/update-image/${mriId}`, newScan, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("New Scan uploaded sucessfully ");
    } catch (error) {
      toast.error(error.response.data.message);
      //toast.error("Error while updating MRI Scan")
    }
  };
}

// Update MRI Scan Details
export function updateMriScanDetails(newDetails, mriId) {
  return async (dispatch,getState) => {
    try {
      const{data} =await request.put(`/api/mriscan/${mriId}`, newDetails, {
        headers: {
          token: getState().auth.user.token,
        },
      });
      dispatch(mriActions.setMriScan(data))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete MRI 
export function deleteMriScan( mriId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/mriscan/${mriId}`, {
        headers: {
          token: getState().auth.user.token,
        },
      });
      dispatch(mriActions.deleteMri(data.mriId));
      toast.success("MRI deleted successfully !")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}