import React from 'react';
import { TextField, Typography } from '@mui/material';
import BoxView from './BoxView';

function Address({ address, handleInputChange }) {

    return (
        <BoxView>
          
            <TextField
                label="Address Line 1"
                name="addressLine1"
                variant="outlined"
                fullWidth
                value={address.addressLine1}
                onChange={handleInputChange}
            />
            <TextField
                label="Address Line 2"
                name="addressLine2"
                variant="outlined"
                fullWidth
                value={address.addressLine2}
                onChange={handleInputChange}
            />
            <TextField 

                label="City"
                name="city"
                variant="outlined"
                fullWidth
                value={address.city}
                onChange={handleInputChange}
            />
            <TextField
                label="Province/State"
                name="province"
                variant="outlined"
                fullWidth
                value={address.province}
                onChange={handleInputChange}
            />
            <TextField
                label="Country"
                name="country"
                variant="outlined"
                fullWidth
                value={address.country}
                onChange={handleInputChange}
            />
            <TextField
                label="Postal Code/Zip"
                name="postalCode"
                variant="outlined"
                fullWidth
                value={address.postalCode}
                onChange={handleInputChange}
            />


        </BoxView>
    );
}

export default Address;
