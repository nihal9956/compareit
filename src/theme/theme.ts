import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    
    palette: {
      mode,

      primary: {
        main: '#46F0D2',
        contrastText: '#131321',
      },

      secondary: {
        main: '#FDBF50',
      },

      background:
        mode === 'light'
          ? {
              default: '#F4F4F8',
              paper: '#FFFFFF',
            }
          : {
              default: '#131321',
              paper: '#1B1C2A',
            },

      text:
        mode === 'light'
          ? {
              primary: '#131321',
              secondary: '#3A3F5C',
            }
          : {
              primary: '#FFFFFF',
              secondary: '#9d9ea2',
            },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: 'Poppins, sans-serif',
      h6: {
        fontWeight: 600,
      },
      body2: {
        fontSize: '0.9rem',
      },
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });
