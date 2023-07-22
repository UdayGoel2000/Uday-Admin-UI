import React from "react";
import { Modal as MuiModal, Backdrop } from "@mui/material";

function Modal({ children, handleClose, open }) {
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      {children}
    </MuiModal>
  );
}

export default Modal;
