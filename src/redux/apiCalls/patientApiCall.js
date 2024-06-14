import { patientActions } from "../slices/patientSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get All Patients
export function getAllPatients() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/patients`, {
        headers: {
          token: getState().auth.user.token,
        },
      });

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

// Get Single Patient Details
export function getSinglePatient(patientId) {
  return async (dispatch ,getState) => {
    try {
      const { data } = await request.get(
        `/api/patients/${patientId}` ,{
          headers:
          {
            token:getState().auth.user.token
          }
        }
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

// Get Patient Count // NOT USED AT ALL
export function getPatientsCount(){
  return async (dispatch,getState)=>{
    try{
      const { data } = await request.get(`/api/patients/count`, {
        headers: {
          token: getState().auth.user.token,
        },
      });
      dispatch(patientActions.setPatientsCount(data));
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
}

// Add Patient
export function addPatient(Patient) {
  return async (dispatch, getState) => {
    try {
      dispatch(patientActions.setLoading());
      
      await request.post(`/api/patients`, Patient, {
        headers: {
          token: getState().auth.user.token,
          
        },
      });
      dispatch(patientActions.setIsPatientAdded());
      setTimeout(() => dispatch(patientActions.clearIsPatientAdded()), 2000);
    } catch (error) {
      toast.error(error.response?.data.message);
      dispatch(patientActions.clearLoading());
    }
  };
}



// Update Patient Details
export function updatePatientDetails(Patient, patientId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/patients/${patientId}`,
        Patient,
        {
          headers: { token: getState().auth.user.token },
        }
      );
      dispatch(patientActions.setPatient(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Patient
export function deletePatient(patientId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/patients/${patientId}`, {
        headers: { token: getState().auth.user.token },
      });
      dispatch(patientActions.deletePatient(data.patientId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
