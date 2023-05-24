import React, {  useContext } from 'react';
import { AppContext } from '../AppContext';
import {  Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';




function NavigationBar() {

  const { appState, setAppState } = useContext(AppContext);
  const { user, settings } = appState;

  const loggedOutView = (<>
    <Button color="inherit" component={Link} to="/login">
      Login
    </Button>
    <Button color="inherit" component={Link} to="/signup">
      Sign Up
    </Button>
    <Button color="inherit" component={Link} to="/">
      About
    </Button>
  </>);

  const loggedInView = (<>

    <Button color="inherit" component={Link} to="/students">
      Students
    </Button>
    <Button color="inherit" component={Link} to="/assets">
      Planes
    </Button>
    <Button color="inherit" component={Link} to="/flights">
      Flights
    </Button>
    <Button color="inherit" component={Link} to="/calendar">
      Calendar
    </Button>
    <Button color="inherit" component={Link} to="/my-profile">
      My Profile
    </Button>
  </>);



  return (
    <AppBar position="static" style={{ marginBottom: '5px' }}>
      <Toolbar>

        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: '#fff' }}>
        <FlightIcon fontSize="small" />   FSM Flight School Management
        </Typography>

        {(user) ? loggedInView : loggedOutView}

      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
