import React from 'react';
import { Grid, Button, } from '@mui/material';
import BoxView from '../BoxView';
import AccountBox from '@mui/icons-material/AccountBox';



function PersonControlPanel({ instructorid, studentid, handleSaveClick,
    handleCreateUserAccountClick, handleAddPhoto, handlePasswordReset, handleBookLesson }) {

    return (
        <>
            <Grid item xs="12" >
                <BoxView>
                    <AccountBox fontSize="large" />
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
                    <Button variant="outlined" fullWidth onClick={handleCreateUserAccountClick}>
                        Create Log-in
                    </Button>
                    <Button variant="outlined" fullWidth onClick={handlePasswordReset}>
                        Reset Password
                    </Button>
                    <Button variant="outlined" fullWidth onClick={() => { alert("Deactivate User") }}>
                        Deactivate
                    </Button>
                </BoxView>
            </Grid>
        </>


    );
}

export default PersonControlPanel;
