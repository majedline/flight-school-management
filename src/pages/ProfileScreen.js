import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

import { Typography, TextField, Button } from '@mui/material';
import BoxView from '../components/BoxView';

function ProfileScreen() {

  const { appState, setAppState } = useContext(AppContext);
  const { user, settings } = appState;

  // Update the appState using setAppState
  const updateGlobalUser = (newUser) => {
    setAppState((prevState) => ({
      ...prevState,
      user: newUser,
    }));
  };


  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    updateGlobalUser(updatedUser)
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Profile
      </Typography>
      <>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={updatedUser.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        {/* Add additional fields for additional profile data */}
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          fullWidth
          value={updatedUser.age}
          onChange={handleInputChange}
        />
        <TextField
          label="Medical Fitness"
          name="medicalFitness"
          variant="outlined"
          fullWidth
          value={updatedUser.medicalFitness}
          onChange={handleInputChange}
        />
        <TextField
          label="Language Proficiency"
          name="languageProficiency"
          variant="outlined"
          fullWidth
          value={updatedUser.languageProficiency}
          onChange={handleInputChange}
        />
        <TextField
          label="Ground School"
          name="groundSchool"
          variant="outlined"
          fullWidth
          value={updatedUser.groundSchool}
          onChange={handleInputChange}
        />
        <TextField
          label="Flight Training"
          name="flightTraining"
          variant="outlined"
          fullWidth
          value={updatedUser.flightTraining}
          onChange={handleInputChange}
        />
        <TextField
          label="Flight Test"
          name="flightTest"
          variant="outlined"
          fullWidth
          value={updatedUser.flightTest}
          onChange={handleInputChange}
        />
        <TextField
          label="Transport Canada Written Exam"
          name="writtenExam"
          variant="outlined"
          fullWidth
          value={updatedUser.writtenExam}
          onChange={handleInputChange}
        />
        {/* Save button */}
        <Button variant="contained" fullWidth onClick={handleSaveClick}>
          Save
        </Button>
      </>
    </BoxView>
  );
}

export default ProfileScreen;
