import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import StudentScreen from './pages/StudentScreen';
import AssetListScreen from './pages/AssetListScreen';
import FlightScreen from './pages/FlightScreen';
import AssetScreen from './pages/AssetScreen';
import CalendarScreen from './pages/CalendarScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import StudentListScreen from './pages/StudentListScreen';
import ProfileScreen from './pages/ProfileScreen';
import PageNotFoundScreen from './pages/PageNotFoundScreen';
import NavigationBar from './navigation/NavigationBar';
import FooterBar from './navigation/FooterBar';
import HomeIntro from './pages/HomeIntro';
import InstructorListScreen from './pages/InstructorListScreen';
import InstructorScreen from './pages/InstructorScreen';

function App() {


  return (
    <HashRouter>
      <NavigationBar />

      <Container sx={{ marginTop: '24px', minHeight: 'calc(100vh - 64px - 80px)' }}>
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/home" element={<HomeIntro />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          <Route path="/students" element={<StudentListScreen />} />
          <Route path="/student" element={<StudentScreen />} />
          <Route path="/student/:studentid" element={<StudentScreen />} />

          <Route path="/instructors" element={<InstructorListScreen />} />
          <Route path="/instructor" element={<InstructorScreen />} />
          <Route path="/instructor/:instructorid" element={<InstructorScreen />} />



          <Route path="/assets" element={<AssetListScreen />} />
          <Route path="/asset" element={<AssetScreen />} />
          <Route path="/asset/:assetid" element={<AssetScreen />} />

          <Route path="/flights" element={<FlightScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />

          <Route path="/my-profile" element={<ProfileScreen />} />

          <Route path="*" element={<PageNotFoundScreen />} />
        </Routes>
      </Container>

      <FooterBar />

    </HashRouter>
  );
}

export default App;
