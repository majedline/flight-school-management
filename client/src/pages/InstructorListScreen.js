import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, TextField } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../util/api';

function InstructorListScreen() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(api.activeInstructors);
        setInstructors(response.data.instructors);
      } catch (error) {
        console.error('Failed to fetch instructors:', error.message);
      }
    };

    fetchInstructors();
  }, []);

  const handleInstructorClick = (instructorId) => {
    navigate(`/instructor/${instructorId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredInstructors = instructors.filter((instructor) => {
    const instructorFirstName = instructor.firstName || ''; 
    const instructorLastName = instructor.lastName || ''; 
    const instructorId = String(instructor.id).toLowerCase();
    const filter = filterText.toLowerCase();

    return instructorFirstName.toLowerCase().includes(filter) || instructorLastName.toLowerCase().includes(filter) || instructorId.includes(filter);
  });

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
                key={instructor.idInstructor}
                component={Link}
                to={`/instructor/${instructor.idInstructor}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleInstructorClick(instructor.idInstructor)}
              >
                <TableCell align="center">{instructor.idInstructor}</TableCell>
                <TableCell align="center">{instructor.firstName + " " + instructor.lastName}</TableCell>
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
