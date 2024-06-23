import "./arContainer.css";
import React from "react";
import marker from "../../Assets/hiro.svg";
import qrCode from "../../Assets/qrcode.svg";
import { Dialog } from "@mui/material";
import QRCodeDialog from "./Dialogs/QR-Code-Dialog/QRCodeDialog";
import MarkerDialog from "./Dialogs/Marker-Dialog/MarkerDialog";

const type = {
  QRCODE: "qr-code",
  MARKER: "marker",
};

const ARContainer = ({ id }) => {
  const [open, setOpen] = React.useState(null);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div className="ar-container">
      <div title="scan-qrcode" className="ar-btn ar-left" onClick={() => setOpen(type.QRCODE)}>
        <img src={qrCode} alt="qr-code" />
      </div>
      <div title="view-marker" className="ar-btn ar-right" onClick={() => setOpen(type.MARKER)}>
        <img
          style={{ height: "40px", width: "40px", padding: "3px" }}
          src={marker}
          alt="marker"
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        {open === type.QRCODE && <QRCodeDialog id={id} handleClose={handleClose} />}
        {open === type.MARKER && <MarkerDialog handleClose={handleClose} />}
      </Dialog>
    </div>
  );
};

export default ARContainer;
