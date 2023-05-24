import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams } from 'react-router-dom';


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

  const initialStudentData =  {
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
    console.log('student is', student);
    // call save
  };

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        {isEditingMode ? 'Edit Student' : 'Create Student'}
      </Typography>
      <>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={student.name}
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
        {/* Add additional fields for additional profile data */}
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          fullWidth
          value={student.age}
          onChange={handleInputChange}
        />
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
      </>
    </BoxView>
  );
}

export default StudentScreen;
