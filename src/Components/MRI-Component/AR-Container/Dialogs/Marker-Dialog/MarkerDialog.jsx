import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import marker from "../../../../Assets/hiro.png"

const MarkerDialog = ({handleClose}) => {
  return (
    <>
      <DialogTitle>Scan the marker using the camera</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <img
        style={{height: "500px", width: "500px"}}
          src={marker}
          alt="marker"
        />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </>
  );
};

export default MarkerDialog;
