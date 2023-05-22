import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link } from 'react-router-dom';

function AssetScreen() {
  // Fetch asset data (planes)
  const planes = [
    { id: 1, name: 'Plane 1', type: 'Type 1' },
    { id: 2, name: 'Plane 2', type: 'Type 2' },
    // Add more planes as needed
  ];

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Asset List
      </Typography>
      <Paper elevation={3} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planes.map((plane) => (
              <TableRow key={plane.id}>
                <TableCell align="center">{plane.id}</TableCell>
                <TableCell align="center">{plane.name}</TableCell>
                <TableCell align="center">{plane.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button component={Link} to="/add-asset" variant="contained" sx={{ marginBottom: '16px' }}>
        Add Asset
      </Button>
    </BoxView>
  );
}

export default AssetScreen;
