import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';
import { semiDarkTheme, lightTheme } from './AppTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider theme={semiDarkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);