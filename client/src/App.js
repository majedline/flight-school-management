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
import CalendarPage from './pages/CalendarPage';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import StudentListScreen from './pages/StudentListScreen';
import ProfileScreen from './pages/ProfileScreen';
import PageNotFoundScreen from './pages/PageNotFoundScreen';
import NavigationBar from './navigation/NavigationBar';
import FooterBar from './navigation/FooterBar';
import HomeIntro from './pages/HomeIntro';
import InstructorListScreen from './pages/InstructorListScreen';
import InstructorScreen from './pages/InstructorScreen';
import PTRScreen from './pages/PTRScreen';
import Test from './Test/Test';
import FlightBookingComponent from './pages/FlightBookingComponent';
import KPIScreen from './pages/KPIScreen';

function App() {


  return (
    <HashRouter>
      <NavigationBar />

      <Container sx={{ marginTop: '24px', minHeight: 'calc(100vh - 64px - 80px)' }}>
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/home" element={<HomeIntro />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen type="student" />} />
          <Route path="/instructor-signup" element={<SignupScreen type="instructor" />} />

          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          <Route path="/students" element={<StudentListScreen />} />
          <Route path="/student" element={<StudentScreen />} />
          <Route path="/student/:studentid" element={<StudentScreen />} />
          <Route path="/ptr" element={<PTRScreen />} />

          <Route path="/instructors" element={<InstructorListScreen />} />
          <Route path="/instructor" element={<InstructorScreen />} />
          <Route path="/instructor/:instructorid" element={<InstructorScreen />} />



          <Route path="/assets" element={<AssetListScreen />} />
          <Route path="/asset" element={<AssetScreen />} />
          <Route path="/asset/:assetid" element={<AssetScreen />} />

          <Route path="/scheduleFlights" element={<FlightScreen />} />
          {/* <Route path="/scheduleFlights" element={<FlightBookingComponent />} /> */}

          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/calendar-page" element={<CalendarPage />} />


          <Route path="/my-profile" element={<ProfileScreen />} />
          <Route path="/kpis" element={<KPIScreen />} />

          <Route path="/test" element={<Test></Test>} />


          <Route path="*" element={<PageNotFoundScreen />} />
        </Routes>
      </Container>

      <FooterBar />

    </HashRouter>
  );
}

export default App;
