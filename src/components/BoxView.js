import React from 'react';
import { Box } from '@mui/material';


function BoxView({ children }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                margin: '0 auto',
                maxWidth:800,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                marginBottom: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                backgroundColor: '#eee',
            }}
        >
            {children}
        </Box>
    );
}

export default BoxView;
