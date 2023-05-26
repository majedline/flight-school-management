import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button,  MenuItem } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams } from 'react-router-dom';
import permitOrLicenceTypes from '../rules/permitOrLicenceType.json';
import aeroplaneLicenceOptions from '../rules/aeroplaneLicenceOptions.json';


function InstructorScreen() {

  // Fetch instructor data
  const instructors = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      medicalFitness: '',
      languageProficiency: '',
      groundSchool: '',
      flightTraining: '',
      flightTest: '',
      writtenExam: '',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@email.com',
      medicalFitness: '',
      languageProficiency: '',
      groundSchool: '',
      flightTraining: '',
      flightTest: '',
      writtenExam: '',
    },
    // Add more Instructors as needed
  ];

  const initialInstructorData = {
    name: '',
    email: '',
    medicalFitness: '',
    languageProficiency: '',
    groundSchool: '',
    flightTraining: '',
    flightTest: '',
    writtenExam: '',
  };

  const [instructor, setInstructor] = useState(initialInstructorData);
  const [isEditingMode, setIsEditingMode] = useState(false); // Check if instructorid exists (editing an existing instructor)


  const [selectedPermitType, setSelectedPermitType] = useState('');
  const [selectedLicence, setSelectedLicence] = useState('');




  const { instructorid } = useParams();

  useEffect(() => {
    if (instructorid) {
      // Find the instructor data from the instructors array based on the ID
      const existingInstructor = instructors.find((instructor) => instructor.id === parseInt(instructorid, 10));

      if (existingInstructor) {
        // Set the existing instructor data as the initial state
        setInstructor(existingInstructor);
        setIsEditingMode(true);
      }
    }
  }, [instructorid]);


  const handleSaveClick = () => {
    console.log('instructor handleSaveClick', instructor);
    // call save
  };

  const handleCreateUserAccountClick = ()=>{
    console.log('instructor handleCreateUserAccountClick', instructor);

  }

  const handleInputChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        {isEditingMode ? 'Edit Instructor' : 'Create Instructor'}
      </Typography>
      <>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={instructor.email}
          onChange={handleInputChange}
        />

       

        <TextField
          label="Permit or Licence Type"
          name="permitType"
          variant="outlined"
          fullWidth
          value={selectedPermitType}
          onChange={(e) => setSelectedPermitType(e.target.value)}
          select
        >
          <MenuItem value="">Select Permit or Licence Type</MenuItem>
          {permitOrLicenceTypes.map((permitType) => (
            <MenuItem value={permitType.permitOrLicenceType} key={permitType.permitOrLicenceType}>
              {permitType.permitOrLicenceType}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Aeroplane Licence"
          name="licence"
          variant="outlined"
          fullWidth
          value={selectedLicence}
          onChange={(e) => setSelectedLicence(e.target.value)}
          select
        >
          <MenuItem value="">Select Aeroplane Licence</MenuItem>
          {aeroplaneLicenceOptions.map((licence) => (
            <MenuItem value={licence.id} key={licence.id}>
              {licence.name}
            </MenuItem>
          ))}
        </TextField>




        <TextField
          label="Medical Fitness"
          name="medicalFitness"
          variant="outlined"
          fullWidth
          value={instructor.medicalFitness}
          onChange={handleInputChange}
        />
        <TextField
          label="Language Proficiency"
          name="languageProficiency"
          variant="outlined"
          fullWidth
          value={instructor.languageProficiency}
          onChange={handleInputChange}
        />
       
        <TextField
          label="Transport Canada Written Exam"
          name="writtenExam"
          variant="outlined"
          fullWidth
          value={instructor.writtenExam}
          onChange={handleInputChange}
        />
        {/* Save button */}
        <Button variant="contained" fullWidth onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="contained" fullWidth onClick={handleCreateUserAccountClick}>
          Create A User Account
        </Button>
      </>
    </BoxView >
  );
}

export default InstructorScreen;
