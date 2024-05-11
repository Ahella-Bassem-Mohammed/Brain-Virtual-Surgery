import { mriActions } from "../slices/mriSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// Upload MRI Scan

export function uploadMriScan(newScan) {
  return async (dispatch,getState) => {
    try {
      dispatch(mriActions.setLoading());
      
      const{data}=await request.post(`/api/mriscan`,{MRIScan: newScan}, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      //dispatch(mriActions.setMriScan(data.Image))
      dispatch(mriActions.setIsMriScanUploaded());
      setTimeout(() => dispatch(mriActions.clearIsMriScanUploaded()), 2000);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(mriActions.clearLoading());
    }
  };
}

// Fetch Single MRI Scan
export function fetchSingleMRI(mriId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/mriscan/${mriId}`);

      dispatch(mriActions.setMriScans(data));
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch MRI Scan ");
      }
    }
  };
}

// Update MRI Scan 
export function updateMriScan(newScan,mriId){
    return async (dispatch,getState)=>{
        try{
            await request.put(`/api/mriscan/upload-image/${mriId}`,newScan,{
                headers: {token:getState().auth.user.token,
                "Content-Type":"multipart/form-data",
            }
            });
            toast.success("New Scan uploaded sucessfully ");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}
