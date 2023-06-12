import React from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import BoxView from '../BoxView';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const StudentStats = () => {
    // Mock data for pilot statistics
    const pilotDataPrivatePilot = {
        labels: [
            'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Oct', 'Sept', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Flights Per Month',
                data: [2, 5, 5, 5, 7, 7, 9, 7, 3, 2, 2, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    return (
        <>

            <BoxView>
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            Flight Counts Monthly
                        </Typography>
                        <Bar data={pilotDataPrivatePilot} />
                    </Grid>
                </Grid>
            </BoxView>
            <BoxView>
                <Typography variant="h6" component="h2" align="center" color="primary">
                    Total Flight Time: 64 Hours
                </Typography>
                <Typography variant="h6" component="h2" align="center" color="blue">
                    Total Revenue: $12,800
                </Typography>
                <Typography variant="h6" component="h2" align="center" color="red">
                    Total Costs after Tax: $7,936
                </Typography>
                <Typography variant="h6" component="h2" align="center" color="red">
                    Total Tax: 1,664.00
                </Typography>
                <Typography variant="h6" component="h2" align="center" color="green">
                    Total Profit: $3,200
                </Typography>
            </BoxView>
        </>
    );
};

export default StudentStats;
