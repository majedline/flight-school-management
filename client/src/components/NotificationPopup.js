import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from '@mui/material/';

const NotificationPopup = ({ open, handleClose }) => {
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
           <Alert severity="info" onClose={handleClose}>Saved!</Alert>

    </Snackbar>
  );
};

export default NotificationPopup;
