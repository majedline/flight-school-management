import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, TextField } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';

function StudentListScreen() {
  const navigate = useNavigate();

  // Fetch student data
  const initialStudents = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more students as needed
  ];

  const [students, setStudents] = useState(initialStudents);
  const [filterText, setFilterText] = useState('');

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(filterText.toLowerCase()) ||
    String(student.id).toLowerCase().includes(filterText.toLowerCase())

    
  );

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
                key={student.id}
                component={Link}
                to={`/student/${student.id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleStudentClick(student.id)}
              >
                <TableCell align="center">{student.id}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
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
