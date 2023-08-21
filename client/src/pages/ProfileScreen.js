import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import axios from 'axios';

import { Typography, TextField, Button } from '@mui/material';
import BoxView from '../components/BoxView';

function ProfileScreen() {
    const navigate = useNavigate();

    const { appState, setAppState } = useContext(AppContext);
    const { user, settings } = appState;

    // Update the appState using setAppState
    const updateGlobalUser = (newUser) => {
        setAppState((prevState) => ({
            ...prevState,
            user: newUser,
        }));
    };



    const [updatedUser, setUpdatedUser] = useState(user);

    const handleSaveClick = () => {
        updateGlobalUser(updatedUser)
    };

    const handleLogoutClick = async () => {
        const response = await axios.post(api.logout);
        updateGlobalUser(null);
        navigate('/')
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
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    value={updatedUser.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    value={updatedUser.lastName}
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
                    label="Enter a new Password to change it, otherwise leave it blank"
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

                <Button variant="contained" fullWidth onClick={handleLogoutClick}>
                    logout
                </Button>
            </>
        </BoxView>
    );
}

export default ProfileScreen;
