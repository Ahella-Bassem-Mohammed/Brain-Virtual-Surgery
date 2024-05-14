import { mriActions } from "../slices/mriSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// Upload MRI Scan

export function uploadMriScan(MRIScan) {
  return async (dispatch,getState) => {
    try {
      dispatch(mriActions.setLoading());
      
      const{data}=await request.post(`/api/mriscan`,MRIScan, {
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
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/mriscan/${mriId}`,
        {headers:{token:getState().auth.user.token}}
      );

      dispatch(mriActions.setMriScan(data));
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
    return async (getState)=>{
        try{
            await request.put(`/api/mriscan/update-image/${mriId}`,newScan,{
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
