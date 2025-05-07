import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#FFD700', // Gold
      light: '#FFE44D',
      dark: '#FFC107',
    },
    error: {
      main: '#FF6B6B', // Coral
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Fredoka One", "Poppins", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#4CAF50',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          padding: '12px 24px',
          fontSize: '1.1rem',
          textTransform: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
}); 