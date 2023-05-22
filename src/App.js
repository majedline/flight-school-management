import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import ProfileScreen from './pages/ProfileScreen';
import AssetScreen from './pages/AssetScreen';
import FlightScreen from './pages/FlightScreen';
import AddAssetForm from './pages/AddAssetForm';
import CalendarScreen from './pages/CalendarScreen';
import { AppProvider } from './AppContext';

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
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/assets">
            Assets
          </Button>
          <Button color="inherit" component={Link} to="/flights">
            Flights
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Calendar
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '24px', minHeight: 'calc(100vh - 64px - 80px)' }}>
        <AppProvider>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/assets" element={<AssetScreen />} />
            <Route path="/flights" element={<FlightScreen />} />
            <Route path="/add-asset" element={<AddAssetForm />} />
            <Route path="/calendar" element={<CalendarScreen />} />
          </Routes>
        </AppProvider>
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
