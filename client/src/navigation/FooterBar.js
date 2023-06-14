import React from 'react';
import { Typography } from '@mui/material';

function FooterBar() {

    return (
        <footer
            style={{
                backgroundColor: '#f5f5f5',
                padding: '16px',
                textAlign: 'center',
                marginTop: 'auto',
                position: 'sticky',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Typography variant="body2" color="textSecondary">
                Flight School Management &copy; {new Date().getFullYear()}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                 (Demo Version 0.1.5)
            </Typography>
        </footer>
    );
}

export default FooterBar;
