import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button} from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';

function StudentListScreen() {
  const navigate = useNavigate();

  // Fetch student data
  const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more students as needed
  ];

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Student List
      </Typography>
      <Paper elevation={3} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                component={Link}
                to={`/student/${student.id}`}
                style={{ textDecoration: 'none' }}
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
