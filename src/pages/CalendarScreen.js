import React, { useState } from 'react';
import { Typography, Grid, Paper, Button } from '@mui/material';

function CalendarScreen() {
  // Get the current date
  const currentDate = new Date();

  // State for storing the selected month and year
  const [selectedDate, setSelectedDate] = useState(currentDate);

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

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {currentMonth} {currentYear}
        </Typography>
      </Grid>

      {daysOfWeek.map((day) => (
        <Grid item xs={1.6} key={`weekday-${day}`}>
          <Paper elevation={0} sx={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1" align="center">
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
        <Grid item xs={1.6} key={`day-${day}`} >
          <Paper elevation={2} sx={{ height: '80px', padding: '5px', '&:hover': { backgroundColor: '#eee' } }}>
            <Typography variant="body1" align="center">
              {day}
            </Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12} container justifyContent="center"  style={{margin:'5px'}}>
        <Button variant="contained" onClick={handlePreviousMonth} style={{margin:'5px'}}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextMonth} style={{margin:'5px'}}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
}

export default CalendarScreen;
