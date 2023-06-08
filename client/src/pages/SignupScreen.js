import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import BoxView from '../components/BoxView';

function SignupScreen() {
  const handleSignup = () => {
    // Handle signup logic here
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Student Sign Up
      </Typography>
      <TextField label="Name" type="text" outlined fullWidth />
      <TextField label="Email" type="email" outlined fullWidth />
      <TextField label="Password" type="password" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>
      <Typography variant="body2" align="center">
        Already have an account? <Link to="/">Log in</Link>
      </Typography>
    </BoxView>
  );
}

export default SignupScreen;
