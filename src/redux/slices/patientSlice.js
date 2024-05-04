import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients:[],
    patientsCount: null,
    loading: false,
    isPatientAdded: false,
    patient:null,
  },
  reducers: {
    setPatients(state, action) {
      state.patients = action.payload;
    },
    setPatientsCount(state, action) {
      state.patientsCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPatientAdded(state) {
      state.isPatientAdded = true;
      state.loading = false;
    },
    clearIsPatientAdded(state) {
      state.isPatientAdded = false;
      
    },
    setPatient(state, action){
      state.patient=action.payload;
    },
    deletePatient(state, action){
      state.patients=state.patients.filter(p=>p._id !== action.payload);

    }
  },
});

const patientReducer = patientSlice.reducer;
const patientActions = patientSlice.actions;

export { patientActions, patientReducer };
