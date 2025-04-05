import { createTheme } from '@mui/material/styles';

const lightTheme = {
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#333333' },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 500 },
    h2: { fontSize: '1.5rem', fontWeight: 400 },
    body1: { fontWeight: 300 }, // Suaviza o texto geral
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' } },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: '20px', textTransform: 'none', padding: '8px 16px' } },
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff' },
  },
  typography: lightTheme.typography,
  components: lightTheme.components,
};

export const getTheme = (darkMode) => createTheme(darkMode ? darkTheme : lightTheme);