import { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext();

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: '#ffffff',
              },
              text: {
                primary: '#121212',
              },
              action:{
                  selected:"#f2f7ffff",
                  button:"#121212",
                  buttonHover:"#252525ff"
              }
            }
          : {
              background: {
                default: '#121212',
              },
              text: {
                secondary: '#ffffff',
                highlight:"#121212"
              },
              action:{
                  button:"#ffffff",
                  buttonHover:"#dcdcdcff"
              }
            }),
      },
    }),
  [mode]
);


  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
