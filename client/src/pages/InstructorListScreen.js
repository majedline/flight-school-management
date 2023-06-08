import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, TextField } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';

function InstructorListScreen() {
  const navigate = useNavigate();

  // Fetch Instructor data
  const initialInstructors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more Instructors as needed
  ];

  const [instructors, setInstructor] = useState(initialInstructors);
  const [filterText, setFilterText] = useState('');

  const handleInstructorClick = (instructorId) => {
    navigate(`/instructor/${instructorId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(filterText.toLowerCase()) ||
    String(instructor.id).toLowerCase().includes(filterText.toLowerCase())

    
  );

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Instructor List
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
            {filteredInstructors.map((instructor) => (
              <TableRow
                key={instructor.id}
                component={Link}
                to={`/instructor/${instructor.id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleInstructorClick(instructor.id)}
              >
                <TableCell align="center">{instructor.id}</TableCell>
                <TableCell align="center">{instructor.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button component={Link} to="/instructor" variant="contained" sx={{ marginBottom: '16px' }}>
        Add Instructor
      </Button>
    </BoxView>
  );
}

export default InstructorListScreen;
