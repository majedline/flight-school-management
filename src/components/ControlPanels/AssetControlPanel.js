import React from 'react';
import { Grid, Button, } from '@mui/material';
import BoxView from '../BoxView';
import AirplaneTicket from '@mui/icons-material/AirplaneTicket';



function AssetControlPanel({ handleSaveClick, handleScheduleMaintenance, handleAddPhoto, handleBookLesson }) {

    return (
        <>
            <Grid item xs="12" >
                <BoxView>
                    <AirplaneTicket fontSize="large" />
                    <Button variant="outlined" fullWidth onClick={handleAddPhoto}>
                        Add Photo
                    </Button>
                </BoxView>
            </Grid>
            <Grid item xs="12" >
                <BoxView>
                    <Button variant="contained" size="large" fullWidth onClick={handleSaveClick}>
                        Save
                    </Button>
                    <Button variant="outlined" fullWidth onClick={handleBookLesson}>
                        Book a Lesson
                    </Button>
                    <Button variant="outlined" fullWidth onClick={handleScheduleMaintenance}>
                        Schedule Maintenance
                    </Button>
                    <Button variant="outlined" fullWidth onClick={() => { alert("Deactivate User") }}>
                        Deactivate
                    </Button>
                </BoxView>
            </Grid>
        </>


    );
}

export default AssetControlPanel;
