import React from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import BoxView from '../components/BoxView';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const HomeIntro = () => {
    // Mock data for pilot statistics
    const pilotDataPrivatePilot = {
        labels: [
            '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
        ],
        datasets: [
            {
                label: 'Canadian Pilots',
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
                label: 'Canadian Pilots',
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
                            Revolutionizing Aviation Management
                        </Typography>
                        <Typography variant="body1" align="justify" gutterBottom>
                            Transforming the way flight schools, aviation training centers, and aviation organizations operate. With our platform, you can optimize
                            your processes, enhance efficiency, and unlock new opportunities in the aviation industry.
                        </Typography>
                        <br />
                        <Typography variant="body1" align="justify" gutterBottom>
                            Streamline student management, track assets, schedule training sessions, and ensure compliance with aviation
                            regulations. Our intuitive user interface empowers you to focus on what matters most: delivering exceptional
                            training and growing your business.
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                            <Button component={Link} to="/login" variant="contained" size="large" color="primary">
                                Get Started
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
                                    Maximize Efficiency
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Simplify administrative tasks, automate workflows, and eliminate manual errors,
                                    allowing you to focus on providing top-notch training experiences.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Real-Time Insights
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Gain valuable insights into student performance, asset utilization, and operational
                                    efficiency through comprehensive analytics and reporting tools.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Enhanced Compliance
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Ensure adherence to aviation regulations with built-in rules validation and
                                    automated permit tracking for students and assets.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' } }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Seamless Collaboration
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Facilitate communication and collaboration among instructors, students,
                                    and admin staff, fostering a cohesive learning environment.
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
                            Canadian Private Pilot Statistics
                        </Typography>
                        <Bar data={pilotDataPrivatePilot} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            Canadian Recreational Private Pilot Statistics
                        </Typography>
                        <Bar data={pilotDataRecreationalPilot} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            The potential for growth and organization is immense.
                        </Typography>
                    </Grid>
                </Grid>
            </BoxView>


            <BoxView>
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center" gutterBottom>
                            Start revolutionizing your aviation management processes today with our FSM.
                        </Typography>
                        <Grid container justifyContent="center">
                            <Button component={Link} to="/login" variant="contained" size="large" color="primary">
                                Get Started
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </BoxView>

            <Typography variant="h10" component="h6" align="center" gutterBottom>
                <Link to='https://tc.canada.ca/en/aviation/licensing-pilots-personnel/aviation-personnel-licensing-statistics#toc1'>Data Sources from Gov. of Canada source</Link>

            </Typography>
        </>
    );
};

export default HomeIntro;
