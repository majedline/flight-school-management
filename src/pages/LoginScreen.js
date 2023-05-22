import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import BoxView from '../components/BoxView';

function LoginScreen() {
  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Login
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" type="password" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" align="center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </BoxView>
  );
}

export default LoginScreen;
