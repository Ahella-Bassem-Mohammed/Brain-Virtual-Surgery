import { mriActions } from "../slices/mriSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// Upload MRI Scan

export function uploadMriScan(newScan) {
  return async (dispatch,getState) => {
    try {
      
      const { data } = await request.post(`/api/mriscan/`,newScan,{
        headers:{token:getState().auth.user.token,
    "Content-Type":"multipart/form-data"}
      });
      dispatch(mriActions.setMriScan(data.Image));
      
      toast.success(data.message);

      // modify the user in local storage with new photo
     /* const user=JSON.parse(localStorage.getItem("userInfo"));
      user.ProfilePhoto=data?.ProfilePhoto;
      localStorage.setItem("userInfo",JSON.stringify(user));*/

     
    } catch (error) {
      toast.error(error.response.data.message);
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
