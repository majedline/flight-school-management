import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import BoxView from '../components/BoxView';
import { useParams, useNavigate } from 'react-router-dom';
import History from '../components/History';
import BasicTabs from '../components/Tabs/BasicTabs';
import AssetControlPanel from '../components/ControlPanels/AssetControlPanel';
import axios from 'axios';
import api from '../util/api';
import NotificationPopup from '../components/NotificationPopup';

function AssetScreen() {
    const historyListData = [
        { id: 1, info: "Created", date: "01/22/2023" },
        { id: 2, info: "Flight by Bob Smith", date: "01/25/2023" },
        { id: 3, info: "Maintenance oil change", date: "02/02/2023" }
    ];
    const navigate = useNavigate();

    const initialAssetData = {
        name: '',
        type: '',
        callSign: '',
        registrationNumber: '',
        flightSchoolDesignation: '',
        flightSchoolAerodrome: ''
    };

    const [asset, setAsset] = useState(initialAssetData);
    const [isEditingMode, setIsEditingMode] = useState(false);

    const { assetid } = useParams();

    useEffect(() => {
        const fetchAssetData = async () => {
            try {
                if (assetid) {
                    const response = await axios.get(`${api.asset}${assetid}`);
                    const assetData = response.data.asset;
                    setAsset(assetData);
                    setIsEditingMode(true);
                }
            } catch (error) {
                console.log(error);
                // Handle error condition
            }
        };

        fetchAssetData();
    }, [assetid]);

    const handleSaveClick = async () => {
        try {
            if (assetid) {
                await axios.post(`${api.asset}${assetid}`, asset);
                setOpen(true);
                console.log('Asset data updated');
            } else {
                const response = await axios.post(api.asset, asset);
                const newAssetId = response.data.assetId;
                setOpen(true);
                console.log('New asset created with ID:', newAssetId);
            }
        } catch (error) {
            console.log(error);
            // Handle error condition
        }
    };

    const handleInputChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };



    const handleTabChange = (event, newValue) => {
        console.log(newValue); // You can perform any additional logic based on the selected tab
    };
  ///////////////////notfication////////////////////////////
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////////////////////////////////////

    return (
        <>
            <Grid container columnSpacing={2} >

            <NotificationPopup open={open} handleClose={handleClose} />


                <Grid item xs={12} md={8}>
                    <BoxView>
                        <BasicTabs
                            title={isEditingMode ? `Asset: ${asset.callSign}`  : 'Create Plane'}
                            tab1={(
                                <BoxView>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        value={asset.name}
                                        onChange={handleInputChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        label="Type"
                                        name="type"
                                        variant="outlined"
                                        fullWidth
                                        value={asset.type}
                                        onChange={handleInputChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        label="Call Sign"
                                        name="callSign"
                                        variant="outlined"
                                        fullWidth
                                        value={asset.callSign}
                                        onChange={handleInputChange}
                                        InputLabelProps={{ shrink: true }}
                                    />

                                </BoxView>
                            )}

                            tab2={(<BoxView>
                                <TextField
                                    label="Registration Number"
                                    name="registrationNumber"
                                    variant="outlined"
                                    fullWidth
                                    value={asset.registrationNumber}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Flight School Designation"
                                    name="flightSchoolDesignation"
                                    variant="outlined"
                                    fullWidth
                                    value={asset.flightSchoolDesignation}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />

                            </BoxView>)}
                            tab3={(<BoxView>
                                <TextField
                                    label="Flight School Aerodrome"
                                    name="flightSchoolAerodrome"
                                    variant="outlined"
                                    fullWidth
                                    value={asset.flightSchoolAerodrome}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </BoxView>)}
                            tab4={(<History historyListData={historyListData} />)}
                        />

                    </BoxView>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AssetControlPanel
                        assetid={asset.id}
                        handleSaveClick={handleSaveClick}
                        handleScheduleMaintenance={() => { alert("handleScheduleMaintenance") }}
                        handleAddPhoto={() => { alert("handleAddPhoto") }}
                        handleBookLesson={() => { alert("handleBookLesson") }}
                    />
                </Grid>
            </Grid>





        </>
    );
}

export default AssetScreen;
