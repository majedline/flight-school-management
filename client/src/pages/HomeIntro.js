import React from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import BoxView from '../components/BoxView';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { useTranslation } from 'react-i18next';

const HomeIntro = () => {

    const { t } = useTranslation();

    // Mock data for pilot statistics
    const pilotDataPrivatePilot = {
        labels: [
            '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
        ],
        datasets: [
            {
                label: t('canadian_pilot'),
                data: [27581, 27138, 26941, 26873, 25868, 24982, 24610, 24132, 24022, 23810, 23425, 22132],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    const pilotDataRecreationalPilot = {
        labels: [
            '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
        ],
        datasets: [
            {
                label: t('canadian_pilot'),
                data: [1267, 1281, 1265, 1283, 1295, 1305, 1315, 1321, 1331, 1329, 1301, 1292],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };




    return (
        <>
            <BoxView>

                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" align="center" gutterBottom>
                            {t('header')}
                        </Typography>
                        <Typography variant="body1" align="justify" gutterBottom>
                            {t('header_body')}
                        </Typography>

                    </Grid>
                    <Grid container justifyContent="center">
                        <Button component={Link} to="/login" variant="contained" size="large" color="primary">
                            {t('button_get_started')}
                        </Button>
                    </Grid>
                </Grid>
            </BoxView>
            <BoxView>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t('ad_max_efficiency')}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {t('ad_max_efficiency_body')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t('ad_read_insight')}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {t('ad_read_insight_body')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t('ad_enhance_compliance')}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {t('ad_enhance_compliance_body')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t('ad_seamless_colab')}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {t('ad_seamless_colab_body')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </BoxView>

            <BoxView>
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            {t('canadian_pvt_type_stats')}
                        </Typography>
                        <Bar data={pilotDataPrivatePilot} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            {t('canadian_rec_type_stats')}
                        </Typography>
                        <Bar data={pilotDataRecreationalPilot} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            {t('potential_growth')}
                        </Typography>
                    </Grid>
                </Grid>
            </BoxView>


            <BoxView>
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" gutterBottom>
                            {t('start_rev_your_aviation')}
                        </Typography>
                        <Grid container justifyContent="center">
                            <Button component={Link} to="/login" variant="contained" size="large" color="primary">
                                {t('button_get_started')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </BoxView>

            <Typography variant="h10" component="h6" align="center" gutterBottom>
                <Link to='https://tc.canada.ca/en/aviation/licensing-pilots-personnel/aviation-personnel-licensing-statistics#toc1'>
                    {t('data_source')}
                </Link>

            </Typography>
        </>
    );
};

export default HomeIntro;
