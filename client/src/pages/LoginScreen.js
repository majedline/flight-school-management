import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import BoxView from '../components/BoxView';

function LoginScreen() {

  const navigate = useNavigate();

  const { appState, setAppState } = useContext(AppContext);
   // Update the appState using setAppState
   const updateGlobalUser = (newUser) => {
    setAppState((prevState) => ({
        ...prevState,
        user: newUser,
    }));
};


  const handleLogin = () => {
    // Handle login logic here
    updateGlobalUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
    });

    navigate("/flights");

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
      <Typography variant="body2" align="center">
      Forgot password? <Link to="/reset-password">Reset Password</Link>
      </Typography>
      <Typography variant="body1" align="center" color={'#f00'}>
      *** Site Under Developmet. Press Login to continue ***
      </Typography>
    </BoxView>
  );
}

export default LoginScreen;
