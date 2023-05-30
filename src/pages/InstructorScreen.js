import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';

import BoxView from '../components/BoxView';
import { useParams } from 'react-router-dom';
import permitOrLicenceTypes from '../rules/permitOrLicenceType.json';
import aeroplaneLicenceOptions from '../rules/aeroplaneLicenceOptions.json';
import History from '../components/History';
import Address from '../components/Address';
import BasicTabs from '../components/Tabs/BasicTabs';



function InstructorScreen() {// Fetch instructor data
  const instructors = [
    {
      id: 1,
      name: 'John Doe',
      age: 20,
      email: 'john@email.com',
      medicalFitness: '',
      languageProficiency: '',
      groundSchool: '',
      flightTraining: '',
      flightTest: '',
      writtenExam: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 22,
      email: 'jane@email.com',
      medicalFitness: '',
      languageProficiency: '',
      groundSchool: '',
      flightTraining: '',
      flightTest: '',
      writtenExam: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
      }
    },
    // Add more instructors as needed
  ];

  const historyListData = [
    { id: 1, info: 'Created Account', date: '01/22/2023' },
    { id: 2, info: 'Flight Lesson with Jack Jones', date: '01/25/2023' },
  ];

  const initialInstructorData = {
    name: '',
    age: '',
    email: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
    },
    medicalFitness: '',
    languageProficiency: '',
    groundSchool: '',
    flightTraining: '',
    flightTest: '',
    writtenExam: '',
  };

  const [instructor, setInstructor] = useState(initialInstructorData);
  const [isEditingMode, setIsEditingMode] = useState(false); // Check if instructorid exists (editing an existing instructor)

  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPermitType, setSelectedPermitType] = useState('');
  const [selectedLicence, setSelectedLicence] = useState('');

  const filteredPermitTypes = permitOrLicenceTypes.filter((permitType) => permitType.age <= selectedAge);

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

  const handleCreateUserAccountClick = () => {
    console.log('instructor handleCreateUserAccountClick', instructor);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "addressLine1" ||
      e.target.name === "addressLine2" ||
      e.target.name === "city" ||
      e.target.name === "province" ||
      e.target.name === "country" ||
      e.target.name === "postalCode"
    ) {
      let addr = instructor.address;
      addr[e.target.name] = e.target.value
      setInstructor({ ...instructor, address: addr });

    }

    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    console.log(newValue); // You can perform any additional logic based on the selected tab
  };


  return (
    <Grid container columnSpacing={2}>

      <Grid item xs="12" md="9">

        <BoxView>

          <BasicTabs

            title={(isEditingMode) ? 'Edit Instructor' : 'Create Instructor'}

            tab1={(
              <BoxView>
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    value={instructor.firstName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Middle Name"
                    name="middleName"
                    variant="outlined"
                    fullWidth
                    value={instructor.middleName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    value={instructor.lastName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={instructor.email}
                    onChange={handleInputChange}
                  />
                </>
              </BoxView>
            )}
            tab2={(
              <BoxView>


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
                  {filteredPermitTypes.map((permitType) => (
                    <MenuItem
                      value={permitType.permitOrLicenceType}
                      key={permitType.permitOrLicenceType}
                    >
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
                  label="Ground School"
                  name="groundSchool"
                  variant="outlined"
                  fullWidth
                  value={instructor.groundSchool}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Flight Training"
                  name="flightTraining"
                  variant="outlined"
                  fullWidth
                  value={instructor.flightTraining}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Flight Test"
                  name="flightTest"
                  variant="outlined"
                  fullWidth
                  value={instructor.flightTest}
                  onChange={handleInputChange}
                />

              </BoxView>

            )}

            tab3={(<Address address={instructor.address} handleInputChange={handleInputChange} />)}

            tab4={(<History historyListData={historyListData} />)}
          />

          {/* Save button */}

        </BoxView>

      </Grid>

      <Grid item xs="12" md="3">
        <Grid item xs="12" >
          <BoxView>
            <AccountBox fontSize="large" />
            <Button variant="contained" fullWidth onClick={handleCreateUserAccountClick}>
              Add Photo
            </Button>
          </BoxView>
        </Grid>
        <Grid item xs="12" >
          <BoxView>
            <Button variant="contained" fullWidth onClick={handleSaveClick}>
              Save Instructor
            </Button>

            <Button variant="contained" fullWidth onClick={handleCreateUserAccountClick}>
              Create Log-in
            </Button>

            <Button variant="contained" fullWidth onClick={handleCreateUserAccountClick}>
              Reset Password
            </Button>
          </BoxView>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InstructorScreen;
