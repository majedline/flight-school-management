import React, { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const slots = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

const FlightBookingComponent = () => {
  const [schedule, setSchedule] = useState('');
  const [slot, setSlot] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [events, setEvents] = useState([
    { id: 1, schedule: 'Morning', slot: '7:00 AM', passengerName: 'John Doe' },
    { id: 2, schedule: 'Afternoon', slot: '12:00 PM', passengerName: 'Jane Smith' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleScheduleChange = event => {
    setSchedule(event.target.value);
  };

  const handleSlotChange = event => {
    setSlot(event.target.value);
  };

  const handlePassengerNameChange = event => {
    setPassengerName(event.target.value);
  };

  const handleBookingSubmit = () => {
    const newEvent = {
      id: Date.now(),
      schedule,
      slot,
      passengerName,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setSchedule('');
    setSlot('');
    setPassengerName('');
  };

  const handleEventSelect = event => {
    setSelectedEvent(event);
    setSchedule(event.schedule);
    setSlot(event.slot);
    setPassengerName(event.passengerName);
  };

  const handleEventDrag = (event, index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    updatedEvents.push(event);
    setEvents(updatedEvents);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Flight Booking
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Input Section */}
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Add New Event</Typography>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Schedule</InputLabel>
              <Select value={schedule} onChange={handleScheduleChange} label="Schedule">
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Slot</InputLabel>
              <Select value={slot} onChange={handleSlotChange} label="Slot">
                {slots.map(slot => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Passenger Name"
              variant="outlined"
              value={passengerName}
              onChange={handlePassengerNameChange}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleBookingSubmit}>
              Book Flight
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Event Grid */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Passenger Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map(timeSlot => {
                  const eventInSlot = events.find(event => event.slot === timeSlot);
                  return (
                    <TableRow
                      key={timeSlot}
                      onClick={() => eventInSlot && handleEventSelect(eventInSlot)}
                      sx={{
                        cursor: eventInSlot ? 'pointer' : 'default',
                        backgroundColor: selectedEvent && selectedEvent.slot === timeSlot ? 'lightgray' : 'transparent',
                      }}
                    >
                      <TableCell>{timeSlot}</TableCell>
                      <TableCell>{eventInSlot ? eventInSlot.passengerName : '-'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlightBookingComponent;
