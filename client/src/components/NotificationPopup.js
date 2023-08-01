import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@mui/material/';

const NotificationPopup = ({ open, handleClose, iserror = false }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity={(iserror) ? "error" : "success"} variant="filled" onClose={handleClose}>
        <AlertTitle>Success!</AlertTitle>
        Record has been saved!
      </Alert>

    </Snackbar>
  );
};

export default NotificationPopup;
