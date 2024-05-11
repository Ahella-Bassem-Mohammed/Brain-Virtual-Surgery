import { createSlice } from "@reduxjs/toolkit";

const mriSlice = createSlice({
  name: "mri",
  initialState: {
    mri:[],
    loading: false,
    isMriScanUploaded:false,
    
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsMriScanUploaded(state){
      state.isMriScanUploaded=true;
      state.loading=false;
    },
    clearIsMriScanUploaded(state){
      state.isMriScanUploaded=false;
    }
    ,
    setMriScan(state, action) {
      state.mri.Image = action.payload;
    },
  },
});

const mriReducer = mriSlice.reducer;
const mriActions = mriSlice.actions;

export { mriActions, mriReducer };
