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
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Address Line 2"
                name="addressLine2"
                variant="outlined"
                fullWidth
                value={address.addressLine2}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
            />
            <TextField 

                label="City"
                name="city"
                variant="outlined"
                fullWidth
                value={address.city}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Province/State"
                name="province"
                variant="outlined"
                fullWidth
                value={address.province}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Country"
                name="country"
                variant="outlined"
                fullWidth
                value={address.country}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Postal Code/Zip"
                name="postalCode"
                variant="outlined"
                fullWidth
                value={address.postalCode}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
            />


        </BoxView>
    );
}

export default Address;
