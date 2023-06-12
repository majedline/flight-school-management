import React from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import BoxView from '../BoxView';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const InstructorStats = () => {
    // Mock data for pilot statistics
    const pilotDataPrivatePilot = {
        labels: [
            'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Oct', 'Sept','Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Count Per Month',
                data: [20, 10, 30, 12, 1, 8, 19, 25, 28, 29, 27, 33],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    const pilotDataRecreationalPilot = {
        labels: [
          'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Oct', 'Sept', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'RUI Per Month',
            data: [1000, 500, 1500, 600, 50, 450, 950, 1250, 1200, 1150, 1350, 1600],
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
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
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" align="center" gutterBottom>
              RUI of Instructor ($/Monthly)
            </Typography>
            <Line data={pilotDataRecreationalPilot} />
          </Grid>
        </Grid>
      </BoxView>


        </>
    );
};

export default InstructorStats;
