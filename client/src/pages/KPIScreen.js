import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';

const KPIScreen = () => {
    // Mock data for student enrollment
    const enrollmentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Student Enrollment',
                data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    // Mock data for student retention
    const retentionData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Student Retention Rate (%)',
                data: [85, 88, 90, 92, 94, 96, 95, 93, 91, 90, 89, 88],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    // Mock data for flight hours
    const flightHoursData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Flight Hours',
                data: [400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620],
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
            },
        ],
    };

    // Mock data for flight hours per plane
    const flightHoursPerPlaneData = {
        labels: ['Plane A', 'Plane B', 'Plane C', 'Plane D', 'Plane E'],
        datasets: [
            {
                label: 'Flight Hours per Plane',
                data: [600, 550, 700, 480, 620],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    };

    // Mock data for instructor-to-student ratio
    const instructorRatioData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Instructor-to-Student Ratio',
                data: [10, 9, 11, 8, 9, 12, 10, 11, 9, 8, 10, 11],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    // Mock data for revenue and profitability
    const revenueProfitData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: [25000, 28000, 30000, 32000, 33000, 35000, 36000, 38000, 40000, 41000, 42000, 44000],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
            {
                label: 'Profit ($)',
                data: [8000, 8500, 9000, 9200, 9500, 9600, 9800, 10000, 10200, 10500, 10800, 11000],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
            },
        ],
    };

    // Mock data for aircraft utilization
    const aircraftUtilizationData = {
        labels: ['Plane A', 'Plane B', 'Plane C', 'Plane D', 'Plane E'],
        datasets: [
            {
                label: 'Aircraft Utilization',
                data: [320, 300, 350, 280, 340],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    };

    // Mock data for aircraft maintenance downtime
    const maintenanceDowntimeData = {
        labels: ['Plane A', 'Plane B', 'Plane C', 'Plane D', 'Plane E'],
        datasets: [
            {
                label: 'Maintenance Downtime (hours)',
                data: [12, 10, 14, 8, 15],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    };

    return (
        <>
            **Mock data **
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Student Enrollment in a Year
                            </Typography>
                            <Bar data={enrollmentData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Student Retention in a Year
                            </Typography>
                            <Line data={retentionData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Flight Hours in a Year
                            </Typography>
                            <Bar data={flightHoursData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Flight Hours per Plane
                            </Typography>
                            <Bar data={flightHoursPerPlaneData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Instructor-to-Student Ratio in a Year
                            </Typography>
                            <Line data={instructorRatioData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Revenue and Profitability in a Year
                            </Typography>
                            <Bar data={revenueProfitData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Aircraft Utilization
                            </Typography>
                            <Bar data={aircraftUtilizationData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" align="center" gutterBottom>
                                Aircraft Maintenance Downtime
                            </Typography>
                            <Bar data={maintenanceDowntimeData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default KPIScreen;
