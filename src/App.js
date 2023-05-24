import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import StudentScreen from './pages/StudentScreen';
import AssetListScreen from './pages/AssetListScreen';
import FlightScreen from './pages/FlightScreen';
import AssetScreen from './pages/AssetScreen';
import CalendarScreen from './pages/CalendarScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import StudentListScreen from './pages/StudentListScreen';
import MyProfileScreen from './pages/MyProfileScreen';
import PageNotFoundScreen from './pages/PageNotFoundScreen';



function App() {


  return (
    <HashRouter>
      <AppBar position="static" style={{ marginBottom: '5px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flight School Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
          <Button color="inherit" component={Link} to="/student">
            New Student
          </Button>
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
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '24px', minHeight: 'calc(100vh - 64px - 80px)' }}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          <Route path="/students" element={<StudentListScreen />} />
          <Route path="/student" element={<StudentScreen />} />
          <Route path="/student/:studentid" element={<StudentScreen />} />
                    
          <Route path="/assets" element={<AssetListScreen />} />
          <Route path="/asset" element={<AssetScreen />} />
          <Route path="/asset/:assetid" element={<AssetScreen />} />
          <Route path="/flights" element={<FlightScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
                    
          <Route path="/my-profile" element={<MyProfileScreen />} />
          <Route path="*" element={<PageNotFoundScreen />} />
        </Routes>
      </Container>

      <footer
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          textAlign: 'center',
          marginTop: 'auto',
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Flight School Management &copy; {new Date().getFullYear()}
        </Typography>
      </footer>
    </HashRouter>
  );
}

export default App;
