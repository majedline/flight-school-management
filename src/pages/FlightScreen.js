import React, { useState } from 'react';
import { Button, MenuItem, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Grid, Paper } from '@mui/material';
import BoxView from '../components/BoxView';
import { Link } from 'react-router-dom';


function FlightScreen() {
    // Fetch student and asset data
    const students = [
        { id: 1, name: 'Student 1' },
        { id: 2, name: 'Student 2' },
        // Add more students as needed
    ];

    const instructors = [
        { id: 1, name: 'Instructor 1' },
        { id: 2, name: 'Instructor 2' },
        // Add more students as needed
    ];

    const assets = [
        { id: 1, name: 'Plane 1' },
        { id: 2, name: 'Plane 2' },
        // Add more assets as needed
    ];

    const scheduledFlights = [
        { id: 1, studentId: 1, instructorId: 1, assetId: 1, time: '2023-05-23 10:00 AM' },
        { id: 2, studentId: 2, instructorId: 1, assetId: 2, time: '2023-05-24 2:00 PM' },
        // Add more scheduled flights as needed
    ];

    const [filter, setFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isFormReset, setFormReset] = useState(false);


    const handleFlightSchedule = () => {
        // Handle flight scheduling logic here
    };

    const filteredFlights = scheduledFlights.filter((flight) => {
        const studentName = students.find((student) => student.id === flight.studentId)?.name || '';
        const instructorName = instructors.find((instructor) => instructor.id === flight.instructorId)?.name || '';
        const assetName = assets.find((asset) => asset.id === flight.assetId)?.name || '';
        const dateTime = flight.time || '';
        const searchText = filter.toLowerCase();
        const selectedDateTime = `${selectedDate} ${selectedTime}`;

        return studentName.toLowerCase().includes(searchText) ||
            instructorName.toLowerCase().includes(searchText) ||
            assetName.toLowerCase().includes(searchText) ||
            dateTime.toLowerCase().includes(searchText) ||
            (selectedDate && selectedTime && dateTime === selectedDateTime);
    });

    return (
        <Grid container columnSpacing={2} >

            <Grid item xs="12" md="4">
                <BoxView>
                    <Typography variant="h4" component="h1" align="center">
                        Schedule Flight
                    </Typography>


                    <TextField
                        label="Student"
                        name="Student"
                        defaultValue={selectedFlight ? selectedFlight.studentId : ''}
                        variant="outlined"
                        fullWidth
                        select
                    >
                        {students.map((student) => (
                            <MenuItem value={student.id} key={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Instructor"
                        name="Instructor"
                        defaultValue={selectedFlight ? selectedFlight.instructorId : ''}
                        variant="outlined"
                        fullWidth
                        select
                    >
                        {instructors.map((instructor) => (
                            <MenuItem value={instructor.id} key={instructor.id}>
                                {instructor.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Asset"
                        defaultValue={selectedFlight ? selectedFlight.assetId : ''}
                        variant="outlined"
                        fullWidth
                        select
                    >
                        {assets.map((asset) => (
                            <MenuItem value={asset.id} key={asset.id}>
                                {asset.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={selectedFlight ? selectedFlight.time.split(' ')[0] : selectedDate}
                        onChange={(e) =>
                            setSelectedDate(e.target.value)
                        }
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Time"
                        type="time"
                        variant="outlined"
                        value={selectedFlight ? selectedFlight.time.split(' ')[1] : selectedTime}
                        onChange={(e) =>
                            setSelectedTime(e.target.value)
                        }
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />



                    <Button variant="contained" fullWidth onClick={handleFlightSchedule}>
                        Schedule Flight
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            setSelectedFlight(null);
                            setSelectedDate('');
                            setSelectedTime('');
                            setFormReset(true);
                        }}
                    >
                        Reset
                    </Button>

                </BoxView>

            </Grid>
            <Grid item xs="12" md="8">
                <BoxView>


                    <Typography variant="h4" component="h1" align="center">
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
                    <Paper elevation={3} sx={{ width: '100%' }}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Student</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Instructor</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Asset</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredFlights.map((flight) => (
                                    <TableRow
                                        key={flight.id}
                                        onClick={() => setSelectedFlight(flight)}
                                        selected={selectedFlight === flight}
                                        style={{ textDecoration: 'none' }}

                                    >
                                        <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.id}</TableCell>
                                        <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{students.find((student) => student.id === flight.studentId)?.name}</TableCell>
                                        <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{instructors.find((instructor) => instructor.id === flight.instructorId)?.name}</TableCell>
                                        <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{assets.find((asset) => asset.id === flight.assetId)?.name}</TableCell>
                                        <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </BoxView>
            </Grid>
        </Grid>
    );
}

export default FlightScreen;
