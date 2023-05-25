import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Grid } from '@mui/material';
import BoxView from '../components/BoxView';

function FlightScreen() {
    // Fetch student and asset data
    const students = [
        { id: 1, name: 'Student 1' },
        { id: 2, name: 'Student 2' },
        // Add more students as needed
    ];

    const assets = [
        { id: 1, name: 'Plane 1' },
        { id: 2, name: 'Plane 2' },
        // Add more assets as needed
    ];

    const scheduledFlights = [
        { id: 1, studentId: 1, assetId: 1, time: '2023-05-23 10:00 AM' },
        { id: 2, studentId: 2, assetId: 2, time: '2023-05-24 2:00 PM' },
        // Add more scheduled flights as needed
    ];

    const [filter, setFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleFlightSchedule = () => {
        // Handle flight scheduling logic here
    };

    const filteredFlights = scheduledFlights.filter((flight) => {
        const studentName = students.find((student) => student.id === flight.studentId)?.name || '';
        const assetName = assets.find((asset) => asset.id === flight.assetId)?.name || '';
        const dateTime = flight.time || '';
        const searchText = filter.toLowerCase();
        const selectedDateTime = `${selectedDate} ${selectedTime}`;

        return studentName.toLowerCase().includes(searchText) ||
            assetName.toLowerCase().includes(searchText) ||
            dateTime.toLowerCase().includes(searchText) ||
            (selectedDate && selectedTime && dateTime === selectedDateTime);
    });

    return (
        <Grid container spacing={2} >

            <Grid item xs="12" md="5">
                <BoxView>
                    <Typography variant="h4" component="h1" align="center">
                        Schedule Flight
                    </Typography>
                    <Select label="Student" name="Student" defaultValue="" variant="outlined" fullWidth>
                        {students.map((student) => (
                            <MenuItem value={student.id} key={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select label="Asset" defaultValue="" variant="outlined" fullWidth>
                        {assets.map((asset) => (
                            <MenuItem value={asset.id} key={asset.id}>
                                {asset.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />

                    <TextField
                        label="Time"
                        type="time"
                        variant="outlined"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" fullWidth onClick={handleFlightSchedule}>
                        Schedule Flight
                    </Button>
                </BoxView>

            </Grid>
            <Grid item xs="12" md="7">
                <BoxView>


                    <Typography variant="h6" component="h2" align="center" style={{ marginTop: '20px' }}>
                        Scheduled Flights
                    </Typography>

                    <TextField
                        label="Search"
                        variant="outlined"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '1px' }}
                    />

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Student</TableCell>
                                <TableCell align="center">Asset</TableCell>
                                <TableCell align="center">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFlights.map((flight) => (
                                <TableRow key={flight.id}>
                                    <TableCell align="center">{flight.id}</TableCell>
                                    <TableCell align="center">{students.find((student) => student.id === flight.studentId)?.name}</TableCell>
                                    <TableCell align="center">{assets.find((asset) => asset.id === flight.assetId)?.name}</TableCell>
                                    <TableCell align="center">{flight.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </BoxView>
            </Grid>
        </Grid>
    );
}

export default FlightScreen;
