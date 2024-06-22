import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import QRCode from "react-qr-code";

const QRCodeDialog = ({id, handleClose}) => {
  return (
    <>
      <DialogTitle>Scan QR Code to view AR Brain</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QRCode value={`https://ar-ick7.onrender.com?id=${id}`} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </>
  )
}

export default QRCodeDialog