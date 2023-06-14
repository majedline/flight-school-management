import React, { useState } from 'react';
import {
    TextField, Grid, Button, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import BoxView from '../components/BoxView';
import PersonControlPanel from '../components/ControlPanels/PersonControlPanel';

function PTRScreen() {
    const [ptrDate, setPtrDate] = useState('');
    const [trainingCourseDetails, setTrainingCourseDetails] = useState('');
    const [flightTime, setFlightTime] = useState('');
    const [flightTrainingSessions, setFlightTrainingSessions] = useState('');
    const [groundTraining, setGroundTraining] = useState('');
    const [examinationsAndTests, setExaminationsAndTests] = useState('');
    const [certificatesAndEndorsements, setCertificatesAndEndorsements] = useState('');
    const [trainingProgression, setTrainingProgression] = useState('');
    const [flightInstructorSignatures, setFlightInstructorSignatures] = useState('');
    const [endorsementsAndRecommendations, setEndorsementsAndRecommendations] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const [ptrRecord, setPtrRecord] = useState({ id: 1 });

    const handleSaveClick = () => {
        // Perform save operation
        console.log('Save clicked!');
    };

    ///////////////////////////////////
    const [ptrRecords, setPtrRecords] = React.useState([
        {
            ptrDate: '',
            trainingCourseDetails: '',
            flightTime: '',
            flightTrainingSessions: '',
            groundTraining: '',
            examinationsAndTests: '',
            certificatesAndEndorsements: '',
            trainingProgression: '',
            flightInstructorSignatures: '',
            endorsementsAndRecommendations: '',
            additionalNotes: '',
        },
    ]);

    const handlePtrChange = (index, field, value) => {
        const updatedRecords = [...ptrRecords];
        updatedRecords[index][field] = value;
        setPtrRecords(updatedRecords);
    };

    const addPtrRecord = () => {
        const newPtrRecord = {
            ptrDate: '',
            trainingCourseDetails: '',
            flightTime: '',
            flightTrainingSessions: '',
            groundTraining: '',
            examinationsAndTests: '',
            certificatesAndEndorsements: '',
            trainingProgression: '',
            flightInstructorSignatures: '',
            endorsementsAndRecommendations: '',
            additionalNotes: '',
        };
        setPtrRecords([...ptrRecords, newPtrRecord]);
    };

    const removePtrRecord = (index) => {
        const updatedRecords = [...ptrRecords];
        updatedRecords.splice(index, 1);
        setPtrRecords(updatedRecords);
    };
    //////////////////////////////////

    return (
        <Grid container columnSpacing={2}>

            <Grid item xs={12} md={8}>

                <BoxView>


                    <TextField
                        label="PTR Date"
                        variant="outlined"
                        fullWidth
                        value={ptrDate}
                        onChange={(e) => setPtrDate(e.target.value)}
                    />

                    <TextField
                        label="Training Course Details"
                        variant="outlined"
                        fullWidth
                        value={trainingCourseDetails}
                        onChange={(e) => setTrainingCourseDetails(e.target.value)}
                    />

                    <TextField
                        label="Flight Time"
                        variant="outlined"
                        fullWidth
                        value={flightTime}
                        onChange={(e) => setFlightTime(e.target.value)}
                    />

                    <TextField
                        label="Flight Training Sessions"
                        variant="outlined"
                        fullWidth
                        value={flightTrainingSessions}
                        onChange={(e) => setFlightTrainingSessions(e.target.value)}
                    />

                    <TextField
                        label="Ground Training"
                        variant="outlined"
                        fullWidth
                        value={groundTraining}
                        onChange={(e) => setGroundTraining(e.target.value)}
                    />

                    <TextField
                        label="Examinations and Tests"
                        variant="outlined"
                        fullWidth
                        value={examinationsAndTests}
                        onChange={(e) => setExaminationsAndTests(e.target.value)}
                    />

                    <TextField
                        label="Certificates and Endorsements"
                        variant="outlined"
                        fullWidth
                        value={certificatesAndEndorsements}
                        onChange={(e) => setCertificatesAndEndorsements(e.target.value)}
                    />

                    <TextField
                        label="Training Progression"
                        variant="outlined"
                        fullWidth
                        value={trainingProgression}
                        onChange={(e) => setTrainingProgression(e.target.value)}
                    />

                    <TextField
                        label="Flight Instructor Signatures"
                        variant="outlined"
                        fullWidth
                        value={flightInstructorSignatures}
                        onChange={(e) => setFlightInstructorSignatures(e.target.value)}
                    />

                    <TextField
                        label="Endorsements and Recommendations"
                        variant="outlined"
                        fullWidth
                        value={endorsementsAndRecommendations}
                        onChange={(e) => setEndorsementsAndRecommendations(e.target.value)}
                    />

                    <TextField
                        label="Additional Notes"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                    />

                    <Button label="Save"
                        onClick={handleSaveClick}
                    >
                        Save
                    </Button>
                </BoxView>
            </Grid>

            <Grid item xs={12} md={4}>

                <PersonControlPanel
                    studentid={ptrRecord.id}
                    handleSaveClick={handleSaveClick}
                    handleCreateUserAccountClick={() => { alert("handleCreateUserAccountClick") }}
                    handleAddPhoto={() => { alert("handleAddPhoto") }}
                    handleBookLesson={() => { alert("handleBookLesson") }}
                    handlePasswordReset={() => { alert("handlePasswordReset") }}
                />
            </Grid>
        </Grid>

    );
}

export default PTRScreen;

