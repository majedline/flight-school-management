import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { changeLanguage } from 'i18next';

const LanguageSwitcher = () => {

    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }


    return (
        <Grid container >
            <Grid item xs={12} >
                <><Button variant="outlined" size="small" onClick={() => { changeLanguage('en') }}>English</Button></>
                <> <Button variant="outlined" size="small" onClick={() => { changeLanguage('fr') }}>French</Button></>
            </Grid>
        </Grid>
    );
};
export default LanguageSwitcher;