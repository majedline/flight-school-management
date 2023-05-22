import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import BoxView from '../components/BoxView';

function AddAssetForm({ onAddAsset }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [callSign, setCallSign] = useState('');
    const [flightSchoolDesignation, setFlightSchoolDesignation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || type.trim() === '') {
            return;
        }
        const newAsset = {
            id: Date.now(),
            name: name.trim(),
            type: type.trim(),
            registrationNumber: registrationNumber.trim(),
            callSign: callSign.trim(),
            flightSchoolDesignation: flightSchoolDesignation.trim(),
        };
        onAddAsset(newAsset);
        setName('');
        setType('');
        setRegistrationNumber('');
        setCallSign('');
        setFlightSchoolDesignation('');
    };

    return (
        <BoxView>
            <Typography variant="h4" component="h1" align="center">
                Add a new asset
            </Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Call Sign"
                value={callSign}
                onChange={(e) => setCallSign(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Flight School Designation Number"
                value={flightSchoolDesignation}
                onChange={(e) => setFlightSchoolDesignation(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <Button variant="contained" type="submit" onClick={handleSubmit}>
                Save
            </Button>
        </BoxView>
    );
}

export default AddAssetForm;
