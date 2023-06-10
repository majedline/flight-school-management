import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    primary: 'blue',
});

export const semiDarkTheme = createTheme({

    palette: {
        background: {
            default: "#888888"
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#333333"
                }
            }
        }
    }
});


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const customTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#345555', // Update the primary color to your preferred color
      },
    }
  });