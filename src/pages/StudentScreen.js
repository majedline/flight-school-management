import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, MenuItem, Grid, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams } from 'react-router-dom';
import permitOrLicenceTypes from '../rules/permitOrLicenceType.json';
import aeroplaneLicenceOptions from '../rules/aeroplaneLicenceOptions.json';


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
    },
    // Add more students as needed
  ];

  const historyListData = [
    { id: 1, info: "Created Account", date: "01/22/2023" },
    { id: 1, info: "Flight Lesson with Jack Jones", date: "01/25/2023" }
  ];

  const initialStudentData = {
    name: '',
    age: '',
    email: '',
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

  const [filterText, setFilterText] = useState('');



  const filteredPermitTypes = permitOrLicenceTypes.filter(
    (permitType) => permitType.age <= selectedAge
  );

  const filteredHistory = historyListData.filter((record) =>
    record.info.toLowerCase().includes(filterText.toLowerCase()) ||
    String(record.date).toLowerCase().includes(filterText.toLowerCase())
  );

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

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleSaveClick = () => {
    console.log('student handleSaveClick', student);
    // call save
  };

  const handleCreateUserAccountClick = () => {
    console.log('student handleCreateUserAccountClick', student);

  }

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (

    <Grid container columnSpacing={2} >
      <Grid item xs="12" md="4">
        <BoxView>
          <Typography variant="h4" component="h1" align="center">
            History
          </Typography>
          <>

            <TextField
              label="Search"
              name="search"
              variant="outlined"
              fullWidth
              value={filterText}
              onChange={handleFilterChange}
              style={{ marginBottom: '16px', marginLeft: '16px', marginRight: '16px', marginTop: '8px' }}
            />

            <Paper elevation={3} sx={{ width: '100%' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Info</TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHistory.map((record) => (
                    <TableRow
                      key={record.id}
                      style={{ textDecoration: 'none' }}
                    >
                      <TableCell >{record.info}</TableCell>
                      <TableCell>{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>


        </BoxView>

      </Grid>

      <Grid item xs="12" md="8">

        <BoxView>
          <Typography variant="h4" component="h1" align="center">
            {isEditingMode ? 'Edit Student' : 'Create Student'}
          </Typography>
          <>

            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={student.email}
              onChange={handleInputChange}
            />

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
              <MenuItem value={14} key={14}>14</MenuItem>
              <MenuItem value={15} key={15}>15</MenuItem>
              <MenuItem value={16} key={16}>16</MenuItem>
              <MenuItem value={17} key={17}>17</MenuItem>
              <MenuItem value={18} key={18}>18</MenuItem>
              <MenuItem value={19} key={19}>19</MenuItem>
              <MenuItem value={20} key={20}>20</MenuItem>
              <MenuItem value={21} key={21}>21+</MenuItem>
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
            {/* Save button */}
            <Button variant="contained" fullWidth onClick={handleSaveClick}>
              Save
            </Button>

            <Button variant="contained" fullWidth onClick={handleCreateUserAccountClick}>
              Create A User Account
            </Button>

          </>
        </BoxView >
      </Grid>
    </Grid>
  );
}

export default StudentScreen;
