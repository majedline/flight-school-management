import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import BoxView from '../components/BoxView';
import axios from 'axios';
import api from '../util/api';


function SignupScreen(type) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(api.register, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phone,
        userType: String(type),
        disclaimerSigned: true
      });

      // Handle success response here
      console.log(response.data);
      navigate("/login");

    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Student Sign Up
      </Typography>
      <TextField
        label="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        outlined
        fullWidth
      />
      <TextField
        label="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        outlined
        fullWidth
      />
      <TextField
        label="Phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        outlined
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        outlined
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>
      <Typography variant="body2" align="center">
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </BoxView>
  );
}

export default SignupScreen;
