import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button, Modal, Box, Switch, FormControlLabel } from '@mui/material';
import CalendarPage from './CalendarPage';
import UnderConstruction from '../components/Icons/UnderConstruction';
import axios from 'axios';
import api from '../util/api';


function CalendarScreen() {
  // Get the current date
  const currentDate = new Date();

  // State for storing the selected month and year
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState(true);

  // Sample data array
  const [sampleData, setSampleData] = useState([
    { date: new Date().setDate(5), data: 'KWO Lesson', details: "Student John Rud with instructor Steve Jinkens" },
    { date: new Date().setDate(10), data: 'KWM Tour', details: "Steve Jinkens taking Alex Smith on tour" },
    { date: new Date().setDate(15), data: 'KWO Maintenance', details: "KWO Scheduled Maintenance" },
    { date: new Date().setDate(16), data: 'KWM Lesson', details: "Student John Rud with instructor Steve Jinkens" },
    { date: new Date().setDate(50), data: 'KWM Lesson', details: "Student John Rud with instructor Steve Jinkens" },
  ]);

  const addRecord = (date, data, details) => {
    const newRecord = {
      date: date, // Current date and time
      data: data,
      details: details,
    };

    setSampleData(prevData => [...prevData, newRecord]);
  };

  const [flights, setFlights] = useState([]);
  // get active flightss
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(api.activeFlights);
        console.log("Done fetching Active Flights", response.data.flights);
        setFlights(response.data.flights);

      } catch (error) {
        console.error('Failed to fetch flights:', error.message);
      }
    };
    fetchFlights();

  }, []);

  // Function to handle navigation to the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    setSelectedDate(nextMonth);
  };

  // Function to handle navigation to the previous month
  const handlePreviousMonth = () => {
    const previousMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
    setSelectedDate(previousMonth);
  };

  // Get the month and year
  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  // Get the first day of the month
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  // Create an array of day numbers for the month
  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);

  // Create an array of empty cells for preceding days
  const emptyCellsArray = [...Array(firstDay).keys()];

  // Create an array of days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to check if a given date is today's date
  const isToday = (date, day) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Function to check if a given date has associated data
  const hasData = (date) => {
    const dateString = date.toDateString();
    return sampleData.some((event) => new Date(event.date).toDateString() === dateString);
  };

  // Function to get data for a given date
  const getData = (date) => {
    const dateString = date.toDateString();
    const eventData = sampleData.filter((event) => new Date(event.date).toDateString() === dateString);
    return eventData.map((event) => event.data);
  };

  // Function to handle event click and open modal
  const handleEventClick = (date) => {
    const dateString = date.toDateString();
    const eventData = sampleData.filter((event) => new Date(event.date).toDateString() === dateString);
    setSelectedEvent(eventData);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };


  const calendarViewUI = (<>

    <Grid container justifyContent="flex-start" spacing={2} >
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {currentMonth} {currentYear} <UnderConstruction></UnderConstruction>
        </Typography>
      </Grid>

      {daysOfWeek.map((day) => (
        <Grid item xs={1.6} key={`weekday-${day}`}>
          <Paper elevation={0} sx={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" align="center">
              {day}
            </Typography>
          </Paper>
        </Grid>
      ))}

      {emptyCellsArray.map((cell) => (
        <Grid item xs={1.6} key={`empty-cell-${cell}`}>
          <Paper elevation={0} sx={{ height: '80px' }} />
        </Grid>
      ))}

      {daysArray.map((day) => (
        <Grid item xs={1.6} key={`day-${day}`}>
          <Paper
            elevation={2}
            sx={{
              height: '80px',
              padding: '5px',
              backgroundColor: hasData(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
                ? '#eee'
                : undefined,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: hasData(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
                  ? '#ddd'
                  : undefined,
              },
            }}
            onClick={() => handleEventClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
          >
            <Typography
              variant="body1"
              align="center"
              color={isToday(selectedDate, day) ? 'primary' : 'inherit'}
            >
              {(isToday(selectedDate, day)) ? `${day} (Today)` : day}
            </Typography>
            {hasData(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)) && (
              <Box sx={{ maxHeight: '60px', overflow: 'auto' }}>
                {getData(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)).map((event, index) => (
                  <Typography key={`event-${index}`} variant="caption" align="center">
                    {event}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12} container justifyContent="center" style={{ margin: '5px' }}>
        <Button variant="contained" onClick={handlePreviousMonth} style={{ margin: '5px' }}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextMonth} style={{ margin: '5px' }}>
          Next
        </Button>
      </Grid>

      <Modal
        open={Boolean(selectedEvent)}
        onClose={handleCloseModal}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            p: 2,
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h6" id="event-modal-title" gutterBottom>
                {selectedEvent.map((event) => event.data).join(', ')}
              </Typography>
              <Typography variant="body1" id="event-modal-description">
                {selectedEvent.map((event) => event.details).join(', ')}
              </Typography>
            </>
          )}
          <Button variant="contained" onClick={handleCloseModal} style={{ marginTop: '10px' }}>
            Close
          </Button>
        </Paper>
      </Modal>
    </Grid>

  </>);
  const listViewUI = (<>
    <CalendarPage></CalendarPage>
    <Grid item xs={12} container justifyContent="center" style={{ margin: '5px' }}>
      <Button variant="contained" onClick={handlePreviousMonth} style={{ margin: '5px' }}>
        Previous
      </Button>
      <Button variant="contained" onClick={handleNextMonth} style={{ margin: '5px' }}>
        Next
      </Button>
    </Grid>
  </>);



  return (
    <>
      <Grid container justifyContent="flex-start" spacing={2} >
        <FormControlLabel control={<Switch defaultChecked onClick={() => { setCalendarView(!calendarView) }} />} label="Calendar View" />
      </Grid>
      {(calendarView) ? calendarViewUI : listViewUI}

    </>

  );
}

export default CalendarScreen;
