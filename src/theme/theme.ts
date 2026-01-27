import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
      },
      text: {
        primary: mode === 'light' ? '#121212' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

