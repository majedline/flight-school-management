import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

import { Typography, TextField, Button } from '@mui/material';
import BoxView from '../components/BoxView';

function MyProfileScreen() {

    const { appState, setAppState } = useContext(AppContext);
    const { user, settings } = appState;

    // Update the appState using setAppState
    const updateGlobalUser = (newUser) => {
        setAppState((prevState) => ({
            ...prevState,
            user: newUser,
        }));
    };


    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        updateGlobalUser(updatedUser)
        setEditing(false);
    };

    const handleInputChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    return (
        <BoxView>
            <Typography variant="h4" component="h1" align="center">
                Profile
            </Typography>
            <>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={updatedUser.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={updatedUser.email}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    value={updatedUser.password}
                    onChange={handleInputChange}
                />
                {/* Save button */}
                <Button variant="contained" fullWidth onClick={handleSaveClick}>
                    Save
                </Button>
            </>
        </BoxView>
    );
}

export default MyProfileScreen;
