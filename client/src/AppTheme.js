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