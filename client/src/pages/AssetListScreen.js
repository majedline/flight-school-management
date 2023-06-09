import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, TextField } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../util/api';

function AssetListScreen() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(api.activeAssets);
        setAssets(response.data.assets);
      } catch (error) {
        console.error('Failed to fetch assets:', error.message);
      }
    };

    fetchAssets();
  }, []);

  const handleAssetClick = (assetId) => {
    navigate(`/asset/${assetId}`);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredAssets = assets.filter((asset) => {
    const assetName = asset.name || ''; // Set an empty string if asset.name is undefined
    const assetId = String(asset.id).toLowerCase();
    const filter = filterText.toLowerCase();

    return assetName.toLowerCase().includes(filter) || assetId.includes(filter);
  });

  return (
    <BoxView>
      <Typography variant="h4" component="h1" align="center">
        Asset List
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
                Type
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                Call Sign
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow
                key={asset.idAsset}
                component={Link}
                to={`/asset/${asset.idAsset}`}
                style={{ textDecoration: 'none' }}
                onClick={() => handleAssetClick(asset.idAsset)}
              >
                <TableCell align="center">{asset.idAsset}</TableCell>
                <TableCell align="center">{asset.type}</TableCell>
                <TableCell align="center">{asset.callSign}</TableCell>
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
