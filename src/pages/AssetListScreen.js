import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';

function AssetListScreen() {
  const navigate = useNavigate();

  // Fetch asset data (planes)
  const initialPlanes = [
    { id: 1, name: 'Plane 1', type: 'Type 1' },
    { id: 2, name: 'Plane 2', type: 'Type 2' },
    // Add more planes as needed
  ];

  const [planes, setPlanes] = useState(initialPlanes);
  const [filterText, setFilterText] = useState('');

  const handleAssetClick = (assetId) => {
    navigate(`/asset/${assetId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredPlanes = planes.filter(
    (plane) =>
      plane.name.toLowerCase().includes(filterText.toLowerCase()) ||
      plane.type.toLowerCase().includes(filterText.toLowerCase()) ||
      String(plane.id).toLowerCase().includes(filterText.toLowerCase())

  );

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Asset List
      </Typography>
      <TextField
        label="Filter"
        name="filter"
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
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlanes.map((plane) => (
              <TableRow
                key={plane.id}
                onClick={() => handleAssetClick(plane.id)}
                style={{ textDecoration: 'none' }}
                component={Link}
                to={`/asset/${plane.id}`}
              >
                <TableCell align="center">{plane.id}</TableCell>
                <TableCell align="center">{plane.name}</TableCell>
                <TableCell align="center">{plane.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button component={Link} to="/asset" variant="contained" sx={{ marginBottom: '16px' }}>
        Add Asset
      </Button>
    </BoxView>
  );
}

export default AssetListScreen;
