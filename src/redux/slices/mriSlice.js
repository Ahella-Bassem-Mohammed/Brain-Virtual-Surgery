import { createSlice } from "@reduxjs/toolkit";

const mriSlice = createSlice({
  name: "mri",
  initialState: {
    mris: [], //upload and delete
    loading: false,
    isMriScanUploaded: false,
    mri: null, //get
  },
  reducers: {
    setMris(state, action) {
      state.mris = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsMriScanUploaded(state) {
      state.isMriScanUploaded = true;
      state.loading = false;
    },
    clearIsMriScanUploaded(state) {
      state.isMriScanUploaded = false;
    },
    setMriScan(state, action) {
      state.mri = action.payload;
    },
    deleteMri(state, action) {
      state.mris = state.mris.filter((m) => m._id !== action.payload);
    },
  },
});

const mriReducer = mriSlice.reducer;
const mriActions = mriSlice.actions;

export { mriActions, mriReducer };
