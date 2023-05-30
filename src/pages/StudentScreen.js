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



function StudentScreen() {
  // Fetch student data
  const students = [
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
    // Add more students as needed
  ];

  const historyListData = [
    { id: 1, info: 'Created Account', date: '01/22/2023' },
    { id: 2, info: 'Flight Lesson with Jack Jones', date: '01/25/2023' },
  ];

  const initialStudentData = {
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

  const [student, setStudent] = useState(initialStudentData);
  const [isEditingMode, setIsEditingMode] = useState(false); // Check if studentid exists (editing an existing student)

  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPermitType, setSelectedPermitType] = useState('');
  const [selectedLicence, setSelectedLicence] = useState('');

  const filteredPermitTypes = permitOrLicenceTypes.filter((permitType) => permitType.age <= selectedAge);

  const { studentid } = useParams();

  useEffect(() => {
    if (studentid) {
      // Find the student data from the students array based on the ID
      const existingStudent = students.find((student) => student.id === parseInt(studentid, 10));

      if (existingStudent) {
        // Set the existing student data as the initial state
        setStudent(existingStudent);
        setIsEditingMode(true);
      }
    }
  }, [studentid]);

  const handleSaveClick = () => {
    console.log('student handleSaveClick', student);
    // call save
  };

  const handleCreateUserAccountClick = () => {
    console.log('student handleCreateUserAccountClick', student);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "addressLine1" ||
      e.target.name === "addressLine2" ||
      e.target.name === "city" ||
      e.target.name === "province" ||
      e.target.name === "country" ||
      e.target.name === "postalCode"
    ) {
      let addr = student.address;
      addr[e.target.name] = e.target.value
      setStudent({ ...student, address: addr });

    }

    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    console.log(newValue); // You can perform any additional logic based on the selected tab
  };


  return (
    <Grid container columnSpacing={2}>

      <Grid item xs="12" md="9">

        <BoxView>

          <BasicTabs

            title={(isEditingMode) ? 'Edit Student' : 'Create Student'}

            tab1={(
              <BoxView>
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    value={student.firstName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Middle Name"
                    name="middleName"
                    variant="outlined"
                    fullWidth
                    value={student.middleName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    value={student.lastName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={student.email}
                    onChange={handleInputChange}
                  />



                </>
              </BoxView>
            )}
            tab2={(
              <BoxView>
                <TextField
                  label="Age"
                  name="age"
                  variant="outlined"
                  fullWidth
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  select
                >
                  <MenuItem value="">Select Age</MenuItem>
                  <MenuItem value={14} key={14}>
                    14
                  </MenuItem>
                  <MenuItem value={15} key={15}>
                    15
                  </MenuItem>
                  <MenuItem value={16} key={16}>
                    16
                  </MenuItem>
                  <MenuItem value={17} key={17}>
                    17
                  </MenuItem>
                  <MenuItem value={18} key={18}>
                    18
                  </MenuItem>
                  <MenuItem value={19} key={19}>
                    19
                  </MenuItem>
                  <MenuItem value={20} key={20}>
                    20
                  </MenuItem>
                  <MenuItem value={21} key={21}>
                    21+
                  </MenuItem>
                </TextField>

                <TextField
                  label="Permit or Licence Type"
                  name="permitType"
                  variant="outlined"
                  fullWidth
                  value={selectedPermitType}
                  onChange={(e) => setSelectedPermitType(e.target.value)}
                  disabled={!selectedAge}
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
                  value={student.medicalFitness}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Language Proficiency"
                  name="languageProficiency"
                  variant="outlined"
                  fullWidth
                  value={student.languageProficiency}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Ground School"
                  name="groundSchool"
                  variant="outlined"
                  fullWidth
                  value={student.groundSchool}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Flight Training"
                  name="flightTraining"
                  variant="outlined"
                  fullWidth
                  value={student.flightTraining}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Flight Test"
                  name="flightTest"
                  variant="outlined"
                  fullWidth
                  value={student.flightTest}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Transport Canada Written Exam"
                  name="writtenExam"
                  variant="outlined"
                  fullWidth
                  value={student.writtenExam}
                  onChange={handleInputChange}
                />
              </BoxView>

            )}

            tab3={(<Address address={student.address} handleInputChange={handleInputChange} />)}

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
              Save Student
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

export default StudentScreen;
