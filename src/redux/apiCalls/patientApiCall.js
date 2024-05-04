import { patientActions } from "../slices/patientSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// Fetch Patients Based on Page Number 
export function fetchPatients(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/patients?pageNumber=${pageNumber}`);

      dispatch(patientActions.setPatients(data));
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch patients");
      }
    }
  };
}


// Get Patient Count
export function getPatientsCount(){
  return async (dispatch)=>{
    try{
      const { data}=await request.get(`/api/patients/count`);
      dispatch(patientActions.setPatientsCount(data));
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
}


// Add Patient
export function addPatient(newPatient){
  return async (dispatch,getState)=>{

    try{
      dispatch(patientActions.setLoading());

      await request.post(`/api/patients`, newPatient, {
        headers: {
          token: getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(patientActions.setIsPatientAdded());
      setTimeout(()=>dispatch(patientActions.clearIsPatientAdded()),2000)
    }catch(error){
      toast.error(error.response.data.message)
      dispatch(patientActions.clearLoading());
    }
  }
}


// Fetch Single Patient Details
export function fetchSinglePatient(patientId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/patients/${patientId}`
      );

      dispatch(patientActions.setPatient(data));
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch patient details");
      }
    }
  };
}


// Update Patient Details
export function updatePatientDetails(newPatient,patientId){
    return async (dispatch,getState)=>{
        try{
            const {data}=await request.put(`/api/patients/${patientId}`,newPatient,{
                headers: {token:getState().auth.user.token,
                
            }
            });
            dispatch(patientActions.setPatient(data))
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}


// Delete Patient 
export function deletePatient(patientId){
    return async (dispatch,getState)=>{
        try{
            const {data}=await request.delete(`/api/patients/${patientId}`,{
                headers: {token:getState().auth.user.token,
                
            }
            });
            dispatch(patientActions.deletePatient(data.patientId));
            toast.success(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}


