import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import emailValidator from 'email-validator'

import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, FormHelperText } from '@mui/material';
import BoxView from '../components/BoxView';

import axios from 'axios';
import api from '../util/api';


function LoginScreen() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

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

    if (!checkEmailAndPasswordAreValid()){
      return;
    }

    axios
      .post(api.login, {
        email,
        password,
      })
      .then(res => {
        console.log(res.data.user.email);
        updateGlobalUser({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          type: res.data.user.type,
          token: res.data.token
        });

        navigate("/scheduleFlights");

      }).catch(err => {
        setErrorMsg(err.response.data.error)
      })
  };

  const checkEmailAndPasswordAreValid = () => {
    if (email && password) {
      let isEmailValid = false;
      let isPasswordValid = false;

      if (!emailValidator.validate(email)) {
        setErrorMsg("The email format is invlaid.");
      } else {
        isEmailValid = true;
      }

      if (password.length <= 2) {
        setErrorMsg("The password is too small.");
      } else {
        isPasswordValid = true;
      }
      return (isEmailValid && isPasswordValid);
    }
    setErrorMsg("Please enter the email and password to sign in");
    return false;
  }

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Login
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth onChange={event => setEmail(event.target.value)} />
      <TextField label="Password" type="password" variant="outlined" fullWidth onChange={event => setPassword(event.target.value)} />
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
      <Typography variant="body2" align="center">
        Forgot password? <Link to="/reset-password">Reset Password</Link>
      </Typography>
      <Typography variant="body2" align="center">
        <FormHelperText error={true}>{errorMsg}</FormHelperText>
      </Typography>
    </BoxView>
  );
}

export default LoginScreen;
