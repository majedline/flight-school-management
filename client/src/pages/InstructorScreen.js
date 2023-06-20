import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams, useNavigate } from 'react-router-dom';
import permitOrLicenceTypes from '../rules/permitOrLicenceType.json';
import aeroplaneLicenceOptions from '../rules/aeroplaneLicenceOptions.json';
import History from '../components/History';
import Address from '../components/Address';
import BasicTabs from '../components/Tabs/BasicTabs';
import PersonControlPanel from '../components/ControlPanels/PersonControlPanel';
import axios from 'axios';
import api from '../util/api';
import NotificationPopup from '../components/NotificationPopup';
import InstructorStats from '../components/Stats/InstructorStats';


function InstructorScreen() {
  const historyListData = [
    { id: 1, info: 'Created Account', date: '01/22/2023' },
    { id: 2, info: 'Flight Lesson with Student Jack Jones', date: '01/25/2023' },
  ];

  const navigate = useNavigate();

  const initialInstructorData = {
    firstName: '',
    middleName:'',
    lastName:'',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    medicalFitness: '',
    languageProficiency: '',
    groundSchool: '',
    flightTraining: '',
    flightTest: '',
    writtenExam: '',
    aeroplaneLicence: '',
  };

  const [instructor, setInstructor] = useState(initialInstructorData);
  const [isEditingMode, setIsEditingMode] = useState(false); // Check if instructorid exists (editing an existing instructor)

  const [selectedPermitType, setSelectedPermitType] = useState('');
  const [selectedLicence, setSelectedLicence] = useState('');

  // const filteredPermitTypes = permitOrLicenceTypes.filter((permitType) => permitType.age <= selectedAge);

  const { instructorid } = useParams();

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(`${api.instructor}${instructorid}`);
        console.log(response);
        const instructorData = response.data.instructor;
        setInstructor(instructorData);
        setIsEditingMode(true);

        setSelectedPermitType(instructorData.permitType);
        setSelectedLicence(instructorData.aeroplaneLicence);

      } catch (error) {
        console.log(error);
        // Handle error condition
      }
    };

    if (instructorid) {
      fetchInstructorData();
    }
  }, [instructorid]);


  const handleSaveClick = async () => {
    console.log('instructor handleSaveClick', instructor);
    try {
      if (instructorid) {
        // Editing an existing user
        await axios.post(`${api.instructor}${instructorid}`, instructor);
        setOpen(true);
        console.log('Instructor data updated');
      } else {
        // Creating a new user
        const results = await axios.post(api.instructor, instructor);
        console.log('New instructor created');
        setOpen(true);
        navigate(`/instructor/${results.data.instructor.idInstructor}`);

      }
    } catch (error) {
      console.log(error);
      // Handle error condition
    }
  };

  const handleCreateUserAccountClick = async () => {
    console.log('instructor handleCreateUserAccountClick', instructor);

    try {
      const response = await axios.post(api.register, {
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email,
        password: "test123",
        confirmPassword: "test123",
        phone: ((instructor.phone) ? instructor.phone : null),
        userType: "instructor",
        disclaimerSigned: true
      });

      // Handle success response here
      console.log(response.data);
      alert(`account created for instructor ${instructor.firstName} ${instructor.lastName} with password 'test123'`);


    } catch (error) {
      // Handle error here
      console.error(error);
      alert(error.response.data.error[0].msg);
    }

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

  ///////////////////notfication////////////////////////////
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////////////////////////////////////

  return (
    <Grid container columnSpacing={2}>

      <Grid item xs={12} md={8}>
        <NotificationPopup open={open} handleClose={handleClose} />

        <BoxView>

          <BasicTabs

            title={(isEditingMode) ? 'Edit Instructor ' : 'Create Instructor'}

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
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Middle Name"
                    name="middleName"
                    variant="outlined"
                    fullWidth
                    value={instructor.middleName}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    value={instructor.lastName}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={instructor.email}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}

                  onChange={(e) => {
                    setSelectedPermitType(e.target.value)
                    setInstructor({ ...instructor, permitType: e.target.value });

                  }}
                  select
                >
                  <MenuItem value="">Select Permit or Licence Type</MenuItem>
                  {permitOrLicenceTypes.map((permitType) => (
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
                  InputLabelProps={{ shrink: true }}

                  onChange={(e) => {
                    setSelectedLicence(e.target.value);
                    setInstructor({ ...instructor, aeroplaneLicence: e.target.value });

                  }}
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
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Language Proficiency"
                  name="languageProficiency"
                  variant="outlined"
                  fullWidth
                  value={instructor.languageProficiency}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Ground School"
                  name="groundSchool"
                  variant="outlined"
                  fullWidth
                  value={instructor.groundSchool}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Flight Training"
                  name="flightTraining"
                  variant="outlined"
                  fullWidth
                  value={instructor.flightTraining}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Flight Test"
                  name="flightTest"
                  variant="outlined"
                  fullWidth
                  value={instructor.flightTest}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Transport Canada Written Exam"
                  name="writtenExam"
                  variant="outlined"
                  fullWidth
                  value={instructor.writtenExam}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </BoxView>

            )}

            tab3={(<Address address={{
              "addressLine1": instructor.addressLine1,
              "addressLine2": instructor.addressLine2,
              "city": instructor.city,
              "province": instructor.province,
              "country": instructor.country,
              "postalCode": instructor.postalCode
            }} handleInputChange={handleInputChange}
              InputLabelProps={{ shrink: true }} />)}

            tab4={(<History historyListData={historyListData} />)}

            tab5={<InstructorStats></InstructorStats>}
          />

          {/* Save button */}

        </BoxView>

      </Grid>

      <Grid item xs={12} md={4}>

        <PersonControlPanel
          instructorid={instructor.id}
          handleSaveClick={handleSaveClick}
          handleCreateUserAccountClick={handleCreateUserAccountClick}
          handleAddPhoto={() => { alert("handleAddPhoto") }}
          handleBookLesson={() => { alert("handleBookLesson") }}
          handlePasswordReset={() => { alert("handlePasswordReset") }}
        />
      </Grid>
    </Grid>
  );
}

export default InstructorScreen;
