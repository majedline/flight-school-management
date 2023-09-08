import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, IconButton, Typography, Tooltip } from '@mui/material';
import { changeLanguage } from 'i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {

    const { i18n } = useTranslation();

    const changeLanguage = () => {

        let lng = 'en';
        if (i18n.language == 'en')
            lng = 'fr';
        else
            lng = 'en';

        i18n.changeLanguage(lng);
    }

    const getToolTipToggleText = () => {
        console.log("ss")
        let lng = i18n.language;
        if (lng == 'en')
            return 'Changer la langue en français';
        else
            return 'Switch Language to English';
    }

    return (
        <Grid container >
            <Grid item xs={12} >
                <IconButton
                    aria-label="langauge"
                    color="inherit"
                    size="small"
                    onClick={() => { changeLanguage() }}>
                    <Tooltip title={getToolTipToggleText()} >
                        <LanguageIcon
                            fontSize="small">
                        </LanguageIcon>
                    </Tooltip>
                </IconButton>
            </Grid>
        </Grid>
    );
};
export default LanguageSwitcher;