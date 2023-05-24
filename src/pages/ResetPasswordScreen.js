import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import BoxView from '../components/BoxView';

function ResetPasswordScreen() {
  const handleResetPassword = () => {
    // Handle password reset logic here
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Reset Password
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth onClick={handleResetPassword}>
        Reset Password
      </Button>
      <Typography variant="body2" align="center">
        Remember your password? <Link to="/login">Login</Link>
      </Typography>
    </BoxView>
  );
}

export default ResetPasswordScreen;
