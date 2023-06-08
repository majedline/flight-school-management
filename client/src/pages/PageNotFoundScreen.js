import React from 'react';
import { Typography } from '@mui/material';
import BoxView from '../components/BoxView';

function PageNotFoundScreen() {

    return (
        <BoxView>
            <Typography variant="h4" component="h1" align="center">
                404 - Page Not Found
            </Typography>
        </BoxView>
    );
}

export default PageNotFoundScreen;
