import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams, useNavigate} from 'react-router-dom';
import permitOrLicenceTypes from '../rules/permitOrLicenceType.json';
import aeroplaneLicenceOptions from '../rules/aeroplaneLicenceOptions.json';
import History from '../components/History';
import Address from '../components/Address';
import BasicTabs from '../components/Tabs/BasicTabs';
import PersonControlPanel from '../components/ControlPanels/PersonControlPanel';
import axios from 'axios';
import api from '../util/api';


function StudentScreen() {
  const historyListData = [
    { id: 1, info: 'Created Account', date: '01/22/2023' },
    { id: 2, info: 'Flight Lesson with Jack Jones', date: '01/25/2023' },
  ];

  const navigate = useNavigate();


  const initialStudentData = {
    name: '',
    age: '',
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

  const [student, setStudent] = useState(initialStudentData);
  const [isEditingMode, setIsEditingMode] = useState(false); // Check if studentid exists (editing an existing student)

  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPermitType, setSelectedPermitType] = useState('');
  const [selectedLicence, setSelectedLicence] = useState('');

  const filteredPermitTypes = permitOrLicenceTypes.filter((permitType) => permitType.age <= selectedAge);

  const { studentid } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${api.student}${studentid}`);
        console.log(response);
        const studentData = response.data.student;
        setStudent(studentData);
        setIsEditingMode(true);

        setSelectedAge(parseInt(studentData.age));
        setSelectedPermitType(studentData.permitType);
        setSelectedLicence(studentData.aeroplaneLicence);

      } catch (error) {
        console.log(error);
        // Handle error condition
      }
    };

    if (studentid) {
      fetchStudentData();
    }
  }, [studentid]);


  const handleSaveClick = async () => {
    console.log('student handleSaveClick', student);
    try {
      if (studentid) {
        // Editing an existing user
        await axios.post(`${api.student}${studentid}`, student);
        console.log('Student data updated');
      } else {
        // Creating a new user
        const results = await axios.post(api.student, student);
        console.log('New student created');
        navigate(`/student/${results.data.student.idStudent}`);

      }
    } catch (error) {
      console.log(error);
      // Handle error condition
    }
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

      <Grid item xs={12} md={8}>

        <BoxView>

          <BasicTabs

            title={(isEditingMode) ? 'Edit Student ' : 'Create Student'}

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
                  onChange={(e) => {
                    setSelectedAge(e.target.value)
                    setStudent({ ...student, age: e.target.value });
                  }}
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
                  onChange={(e) => {
                    setSelectedPermitType(e.target.value)
                    setStudent({ ...student, permitType: e.target.value });

                  }}
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
                  onChange={(e) => {
                    setSelectedLicence(e.target.value);
                    setStudent({ ...student, aeroplaneLicence: e.target.value });

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

            tab3={(<Address address={{
              "addressLine1": student.addressLine1,
              "addressLine2": student.addressLine2,
              "city": student.city,
              "province": student.province,
              "country": student.country,
              "postalCode": student.postalCode
            }} handleInputChange={handleInputChange} />)}

            tab4={(<History historyListData={historyListData} />)}
          />

          {/* Save button */}

        </BoxView>

      </Grid>

      <Grid item xs={12} md={4}>

        <PersonControlPanel
          studentid={student.id}
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

export default StudentScreen;
