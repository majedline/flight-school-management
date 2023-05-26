import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams } from 'react-router-dom';
import History from '../components/History';


function AssetScreen() {

    // Fetch asset data
    const assets = [
        {
            id: 1,
            name: 'plane 1',
            type: 'Cessna 174',
            registrationNumber: '',
            callSign: 'KWM',
            flightSchoolDesignation: '',
        },
        {
            id: 2,
            name: 'plane 2',
            type: 'Cessna 172',
            registrationNumber: '',
            callSign: 'KWO',
            flightSchoolDesignation: '',
        },
        // Add more assets as needed
    ];

    const initialAssetData = {
        name: '',
        type: '',
        registrationNumber: '',
        callSign: '',
        flightSchoolDesignation: '',
    };

    const historyListData = [
        { id: 1, info: "Created", date: "01/22/2023" },
        { id: 2, info: "Flight by Bob Smith", date: "01/25/2023" },
        { id: 3, info: "Maintenance oil change", date: "02/02/2023" }
    ];

    const [asset, setAsset] = useState(initialAssetData);
    const [isEditingMode, setIsEditingMode] = useState(false); // Check if assetid exists (editing an existing asset)

    const { assetid } = useParams();

    useEffect(() => {
        if (assetid) {
            // Find the asset data from the assets array based on the ID
            const existingAsset = assets.find((asset) => asset.id === parseInt(assetid, 10));

            if (existingAsset) {
                // Set the existing asset data as the initial state
                setAsset(existingAsset);
                setIsEditingMode(true);
            }
        }
    }, [assetid]);


    const handleSaveClick = () => {
        console.log('asset is', asset);
        // call save
    };

    const handleInputChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Grid container columnSpacing={2} >

                <Grid item xs="12" md="4">
                    <History historyListData={historyListData}></History>
                </Grid>
                <Grid item xs="12" md="8">
                    <BoxView>
                        <Typography variant="h4" component="h1" align="center">
                            {isEditingMode ? 'Edit asset' : 'Create asset'}
                        </Typography>
                        <>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={asset.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Type"
                                name="type"
                                variant="outlined"
                                fullWidth
                                value={asset.type}
                                onChange={handleInputChange}
                            />
                            {/* Add additional fields for additional profile data */}
                            <TextField
                                label="Registration Number"
                                name="registrationNumber"
                                variant="outlined"
                                fullWidth
                                value={asset.registrationNumber}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Call Sign"
                                name="callSign"
                                variant="outlined"
                                fullWidth
                                value={asset.callSign}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Flight School Designation"
                                name="flightSchoolDesignation"
                                variant="outlined"
                                fullWidth
                                value={asset.flightSchoolDesignation}
                                onChange={handleInputChange}
                            />
                            {/* Save button */}
                            <Button variant="contained" fullWidth onClick={handleSaveClick}>
                                Save
                            </Button>
                        </>
                    </BoxView>
                </Grid>
            </Grid>

        </>
    );
}

export default AssetScreen;
