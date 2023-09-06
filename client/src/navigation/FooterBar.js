import React from 'react';
import { Typography } from '@mui/material';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function FooterBar() {
    const { t } = useTranslation();


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
                 (Demo Version 0.1.5 - Powered by <Link style={{textDecoration: 'none'}} to="https://admcan.com/">ADMCAN</Link>)
            </Typography>
            <LanguageSwitcher></LanguageSwitcher>

        </footer>
    );
}

export default FooterBar;
