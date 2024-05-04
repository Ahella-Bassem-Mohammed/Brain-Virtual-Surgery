import { createSlice } from "@reduxjs/toolkit";

const mriSlice = createSlice({
  name: "mri",
  initialState: {
    mris: [],
    mri: null,
  },
  reducers: {
    setMriScans(state, action) {
      state.mris = action.payload;
    },
    setMriScan(state, action) {
      state.mri.Image.url = action.payload;
    },
  },
});

const mriReducer = mriSlice.reducer;
const mriActions = mriSlice.actions;

export { mriActions, mriReducer };
