import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Avatar, Box } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import MenuIcon from '@mui/icons-material/Menu';
import { getNameInitials } from '../util/helper';

import { useTranslation } from 'react-i18next';
import appLogo from '../images/app-logo-2.png';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

function NavigationBar() {
  const { appState, setAppState } = useContext(AppContext);
  const { user, settings } = appState;
  const { t } = useTranslation();
  console.log("appState", appState.user);

  const loggedOutView = (
    <>
      <Button color="inherit" component={Link} to="/login">
        {t('nav_login')}
      </Button>
      <Button color="inherit" component={Link} to="/signup" >
        {t('nav_signup')}
      </Button>
      <Button color="inherit" component={Link} to="/" >
        {t('nav_overview')}
      </Button>
      <Box><LanguageSwitcher></LanguageSwitcher></Box>
    </>
  );

  const loggedInView = (
    <>
      <Button color="inherit" component={Link} to="/scheduleFlights">
        Flights
      </Button>
      <Button color="inherit" component={Link} to="/students">
        Students
      </Button>
      <Button color="inherit" component={Link} to="/instructors">
        Instructors
      </Button>
      <Button color="inherit" component={Link} to="/assets">
        Planes
      </Button>
      <Button color="inherit" component={Link} to="/calendar">
        Calendar
      </Button>
      <Button color="inherit" component={Link} to="/kpis">
        KPIs
      </Button>
      {/* <Button color="inherit" component={Link} to="/ptr">
        My PTR
      </Button> */}
      <Button color="inherit" component={Link} to="/my-profile">
        <Avatar >{
          (appState && appState.user) ?
            getNameInitials(appState.user.firstName, appState.user.lastName) :
            "FSM"
        }</Avatar>
      </Button>

      {(process.env.NODE_ENV === "production") ? "" : (
        <Button color="inherit" component={Link} to="/test">
          Test
        </Button>
      )}

    </>
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab' && event.shiftKey) || event.key === 'Escape')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" style={{ marginBottom: '5px' }}      >
        <Toolbar>
          {isMobileView && (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to='/'>
            <img src={appLogo} style={{ width: '120px', paddingTop: '7px', marginLeft: '10px' }} />
          </Link>
          <Typography
            variant={(isMobileView) ? "h7" : "h6"}
            component={Link}
            to="/"
            sx={{ flexGrow: 1 }}
            style={{ textDecoration: 'none', color: '#fff' }}
          >

            {/* <FlightIcon fontSize="small" /> */}
          </Typography>


          {!isMobileView && (
            <>{(user) ? loggedInView : loggedOutView}</>
          )}
        </Toolbar>
      </AppBar>

      {isMobileView && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List style={{ width: 250 }} onClick={toggleDrawer(false)}>
            {(user) ? (
              <>
                <ListItem component={Link} to="/scheduleFlights">
                  <ListItemText primary="Flights" />
                </ListItem>
                <ListItem component={Link} to="/students">
                  <ListItemText primary="Students" />
                </ListItem>
                <ListItem component={Link} to="/assets">
                  <ListItemText primary="Planes" />
                </ListItem>
                <ListItem component={Link} to="/calendar">
                  <ListItemText primary="Calendar" />
                </ListItem>
                <ListItem component={Link} to="/kpis">
                  <ListItemText primary="KPIs" />
                </ListItem>
                {/* <ListItem component={Link} to="/ptr">
                  <ListItemText primary="My PTR" />
                </ListItem> */}
                <ListItem component={Link} to="/my-profile">
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem component={Link} to="/test">
                  <ListItemText primary="Test" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem component={Link} to="/login" >
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem component={Link} to="/signup">
                  <ListItemText primary="Sign Up" />
                </ListItem>
                <ListItem component={Link} to="/">
                  <ListItemText primary="Overview" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      )}
    </>
  );
}

export default NavigationBar;
