import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FormControl, Select, Button, FormHelperText,
    Typography, Table, TableHead, TableRow, TableCell,
    TableBody, TextField, Grid, Paper, InputLabel
} from '@mui/material';
import BoxView from '../components/BoxView';
import { Link } from 'react-router-dom';
import api, { student } from '../util/api';
import { stringify } from 'uuid';


function FlightScreen() {
    const types = [
        { id: 1, name: 'Lesson' },
        { id: 2, name: 'Tour' },
        // Add more assets as needed
    ];

    // search filter
    const [searchFilter, setSearchFilter] = useState('');

    // used in filters
    const [assets, setAssets] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);

    // list of flights
    const [flights, setFlights] = useState([]);

    // the values selected
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    // If a flight is selected from the list, then it will be loaded here, 
    //otherwise it is set with default values for a new flights
    const [selectedFlight, setSelectedFlight] = useState(
        {
            flightID: null,
            studentID: null,
            instructorID: null,
            assetID: null,
            startDate: new Date(),
            endDate: new Date()
        }
    );
    const [selectedFlightUpdateCounter, setSelectedFlightUpdateCounter] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");


    // get active assets
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get(api.activeAssets);
                console.log("Done fetching Active Assets", response.data.assets)
                setAssets(response.data.assets);
            } catch (error) {
                console.error('Failed to fetch assets:', error.message);
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await axios.get(api.activeInstructors);
                console.log("Done fetching Active Instructors", response.data.instructors);
                setInstructors(response.data.instructors);
            } catch (error) {
                console.error('Failed to fetch instructors:', error.message);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get(api.activeStudents);
                console.log("Done fetching Active Students", response.data.students);
                setStudents(response.data.students);
            } catch (error) {
                console.error('Failed to fetch students:', error.message);
            }
        };

        const fetchFlights = async () => {
            try {
                const response = await axios.get(api.activeFlights);
                console.log("Done fetching Active Flights", response.data.flights);
                setFlights(response.data.flights);
            } catch (error) {
                console.error('Failed to fetch flights:', error.message);
            }
        };

        fetchInstructors();
        fetchStudents();
        fetchAssets();
        fetchFlights();
    }, [selectedFlightUpdateCounter]);

    const handleFlightClick = (flight) => {
        setSelectedFlight(flight);
        console.log("handleFlightClick", flight)

        // Find the corresponding asset for the selected flight
        const student = students.find((s) => s.studentID === flight.studentID);
        console.log("student", student);
        setSelectedStudent(student);

        const instructor = instructors.find((i) => i.instructorID === flight.instructorID);
        console.log("instructor", instructor);
        setSelectedInstructor(instructor);

        const asset = assets.find((a) => a.assetID === flight.assetID);
        console.log("asset", asset);
        setSelectedAsset(asset);
    };

    const handleChange = (event) => {
        console.log("handleChange", "event.target.id", event.target.id, "event.target.value", event.target.value, "done");

        if (event.target.value === "No Selection") {
            return;
        }

        if (event.target.id === "studentSelectionList") {
            const student = students.find((s) => (s.firstName + " " + s.lastName) === event.target.value);
            console.log("student", student);
            setSelectedStudent(student);

            const updatedFlight = { ...selectedFlight, studentID: student.studentID };
            setSelectedFlight(updatedFlight)
        }

        if (event.target.id === "instructorSelectionList") {
            const instructor = instructors.find((i) => (i.firstName + " " + i.lastName) === event.target.value);
            console.log("instructor", instructor);
            setSelectedInstructor(instructor);

            const updatedFlight = { ...selectedFlight, instructorID: instructor.instructorID };
            setSelectedFlight(updatedFlight)
        }


        if (event.target.id === "assetSelectionList") {
            const asset = assets.find((a) => a.name === event.target.value);
            console.log("asset", asset);
            setSelectedAsset(asset);

            const updatedFlight = { ...selectedFlight, assetID: asset.assetID };
            setSelectedFlight(updatedFlight)
        }
        console.log("updatedFlight selectedFlight", selectedFlight);

    };


    const handleSaveFlight = async () => {

        const canSave = validateContentBeforeSaveFlight();
        if (!canSave) {
            return;
        }

        if (selectedFlight) {
            let apiCall = api.flight;

            if (selectedFlight.flightID != null) {
                apiCall = `${api.flight}${selectedFlight.flightID}`
            }

            const requestBody = {
                studentID: selectedFlight.studentID,
                instructorID: selectedFlight.instructorID,
                assetID: selectedFlight.assetID,
                startDate: selectedFlight.startDate,
                endDate: selectedFlight.endDate
            }

            console.log('Will save selectedFlight  ', selectedFlight, " by calling apiCall", apiCall, "with body", requestBody);

            // Handle flight scheduling logic here
            try {
                const response = await axios.post(apiCall, requestBody);
                setSelectedFlightUpdateCounter(selectedFlightUpdateCounter + 1);
                console.log("response", response);
                handleClearFlightScreen();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleClearFlightScreen = () => {
        setSelectedFlight({
            flightID: null,
            studentID: null,
            instructorID: null,
            assetID: null,
            startDate: new Date(),
            endDate: new Date()
        });
        setSelectedAsset(null);
        setSelectedStudent(null);
        setSelectedInstructor(null);
        setSelectedDate('');
        setSelectedTime('');
        setErrorMsg('');
    }

    const validateContentBeforeSaveFlight = () => {
        if (selectedFlight === null) {
            setErrorMsg("Enter a Flight or Select a Flight");
            return false;
        } else if (selectedFlight.assetID === null ||
            selectedFlight.studentID === null ||
            selectedFlight.instructorID === null) {

            setErrorMsg("Enter All Flight Informtion");
            return false;

        } else {
            return true;
        }
    }


    const filteredFlights = flights.filter((item) => {
        const searchText = searchFilter.toLowerCase();
        return (
            item.studentFirstName.toLowerCase().includes(searchText) ||
            item.studentLastName.toLowerCase().includes(searchText) ||
            (item.studentFirstName.toLowerCase() + " " + item.studentLastName.toLowerCase()).includes(searchText) ||

            item.instructorFirstName.toLowerCase().includes(searchText) ||
            item.instructorLastName.toLowerCase().includes(searchText) ||
            (item.instructorFirstName.toLowerCase() + " " + item.instructorLastName.toLowerCase()).includes(searchText) ||

            item.assetName.toLowerCase().includes(searchText) ||
            item.startDate.includes(searchText) ||
            item.endDate.includes(searchText)
        );
    });

    const flightEditSection = (
        <Grid item xs={12} md={4}>
            <BoxView>

                <Typography variant="h4" component="h1" align="center">

                    {(selectedFlight.flightID === null) ? "Schedule Flight" : "Edit Flight " + selectedFlight.flightID}
                </Typography>


                <FormControl>
                    <InputLabel
                        style={{ backgroundColor: "#dddddd" }}
                        htmlFor="studentSelectionList">
                        &nbsp; Student &nbsp;
                    </InputLabel>
                    <Select
                        id="studentSelectionList"
                        native
                        InputLabelProps={{ shrink: true }}
                        value={selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : "No Selection"}
                        onChange={handleChange}
                        style={{ minWidth: 300 }}
                    >
                        <option value={"No Selection"} key={""}> </option>
                        {students.map((student) => (
                            <option value={`${student.firstName} ${student.lastName}`} key={student.studentID}>
                                {`${student.firstName} ${student.lastName}`}
                            </option>
                        ))}
                    </Select>
                </FormControl>


                <FormControl>
                    <InputLabel
                        style={{ backgroundColor: "#dddddd" }}
                        htmlFor="instructorSelectionList">
                        &nbsp; Instructor &nbsp;
                    </InputLabel>
                    <Select
                        id="instructorSelectionList"
                        native
                        InputLabelProps={{ shrink: true }}
                        value={selectedInstructor ? `${selectedInstructor.firstName} ${selectedInstructor.lastName}` : "No Selection"}
                        onChange={handleChange}
                        style={{ minWidth: 300 }}
                    >
                        <option value={"No Selection"} key={""}> </option>
                        {instructors.map((instructor) => (
                            <option value={`${instructor.firstName} ${instructor.lastName}`} key={instructor.instructorID}>
                                {`${instructor.firstName} ${instructor.lastName}`}
                            </option>
                        ))}
                    </Select>
                </FormControl>


                <FormControl>
                    <InputLabel
                        style={{ backgroundColor: "#dddddd" }}
                        htmlFor="assetSelectionList">
                        &nbsp; Asset &nbsp;
                    </InputLabel>
                    <Select
                        id="assetSelectionList"
                        native
                        InputLabelProps={{ shrink: true }}
                        value={selectedAsset ? selectedAsset.name : "No Selection"}
                        onChange={handleChange}
                        style={{ minWidth: 300 }}
                    >
                        <option value={"No Selection"} key={""}> </option>
                        {assets.map((asset) => (
                            <option value={asset.name} key={asset.assetID}>
                                {asset.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>


                <FormControl>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Start Date"
                        type="datetime"
                        variant="outlined"
                        // value={selectedFlight ? selectedFlight.startDate.split(' ')[0] : selectedDate}
                        value={selectedFlight ? selectedFlight.startDate : selectedDate}
                        onChange={(e) =>
                            setSelectedDate(e.target.value)
                        }
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                </FormControl>
                <FormControl>

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Start Time"
                        type="time"
                        variant="outlined"
                        // value={selectedFlight ? selectedFlight.startDate.split(' ')[1] : selectedTime}
                        onChange={(e) =>
                            setSelectedTime(e.target.value)
                        }
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />

                </FormControl>



                {/* <TextField
                        label="Type"
                        defaultValue={selectedFlight ? selectedFlight.typid : ''}
                        variant="outlined"
                        fullWidth
                        select
                    >
                        {types.map((type) => (
                            <MenuItem value={type.id} key={type.id}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </TextField> */}




                <Button variant="contained" fullWidth onClick={handleSaveFlight}>
                    Save Flight
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClearFlightScreen}
                >
                    Reset
                </Button>
                <Typography variant="body2" align="center">
                    <FormHelperText error={true}>{errorMsg}</FormHelperText>
                </Typography>
            </BoxView>

        </Grid>
    );

    const flightListSection = (
        <Grid item xs={12} md={8}>
            <BoxView>


                <Typography variant="h4" component="h1" align="center">
                    Scheduled Flights
                </Typography>

                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '1px' }}
                />
                <Paper elevation={3} sx={{ width: '100%' }}>

                    <Table>
                        <TableHead>
                            <TableRow key="header-row">
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
                                    onClick={() => handleFlightClick(flight)}
                                    selected={selectedFlight === flight}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.flightID}</TableCell>
                                    <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.studentFirstName + " " + flight.studentMiddleName + " " + flight.studentLastName}</TableCell>
                                    <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.instructorFirstName + " " + flight.instructorMiddleName + " " + flight.instructorLastName}</TableCell>
                                    <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.assetName}</TableCell>
                                    <TableCell component={Link} style={{ textDecoration: 'none' }} align="center">{flight.startDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </BoxView>
        </Grid>
    );


    return (
        <Grid container columnSpacing={2} >
            {flightEditSection}
            {flightListSection}
        </Grid>
    );
}

export default FlightScreen;
