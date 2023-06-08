import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, TextField } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../util/api';

function StudentListScreen() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(api.activeStudents);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Failed to fetch students:', error.message);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const studentName = student.name || ''; // Set an empty string if student.name is undefined
    const studentId = String(student.id).toLowerCase();
    const filter = filterText.toLowerCase();

    return studentName.toLowerCase().includes(filter) || studentId.includes(filter);
  });

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Student List
      </Typography>

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
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.idStudent}
                component={Link}
                to={`/student/${student.idStudent}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleStudentClick(student.idStudent)}
              >
                <TableCell align="center">{student.idStudent}</TableCell>
                <TableCell align="center">{student.firstName+" "+student.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button component={Link} to="/student" variant="contained" sx={{ marginBottom: '16px' }}>
        Add Student
      </Button>
    </BoxView>
  );
}

export default StudentListScreen;
