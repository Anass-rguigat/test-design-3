import { createTheme } from '@mui/material/styles';
import { MICEPP } from './brandColors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: MICEPP.primary,
      light: MICEPP.primaryLight,
      dark: MICEPP.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: MICEPP.primaryDarker,
      light: MICEPP.primarySurface,
      dark: MICEPP.primaryMuted,
    },
    success: { main: MICEPP.primaryBright, light: MICEPP.primarySurface },
    warning: { main: MICEPP.accentOrange, light: '#FFF3E0' },
    error: { main: '#C62828', light: '#FFEBEE' },
    grey: {
      50: MICEPP.background,
      100: MICEPP.backgroundAlt,
      200: '#E4E7EC',
      400: '#98A2B3',
      600: MICEPP.textSecondary,
      900: MICEPP.textPrimary,
    },
    background: { default: MICEPP.background, paper: MICEPP.paper },
    text: { primary: MICEPP.textPrimary, secondary: MICEPP.textSecondary },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, fontSize: '1.125rem' },
    h5: { fontWeight: 600, fontSize: '1rem' },
    h6: { fontWeight: 600, fontSize: '0.875rem' },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 16 },
  shadows: [
    'none',
    '0 1px 2px rgba(23, 27, 23, 0.04)',
    '0 4px 12px rgba(23, 27, 23, 0.06)',
    '0 8px 24px rgba(23, 27, 23, 0.08)',
    '0 16px 48px rgba(59, 145, 75, 0.1)',
    ...Array(20).fill('0 16px 48px rgba(59, 145, 75, 0.1)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: '10px 20px' },
        contained: {
          background: MICEPP.gradientPrimary,
          boxShadow: '0 4px 14px rgba(59, 145, 75, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #007038 0%, #255A2F 100%)',
            boxShadow: '0 6px 20px rgba(59, 145, 75, 0.4)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          background: MICEPP.gradientPrimary,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '16px !important',
          '&:before': { display: 'none' },
          boxShadow: 'none',
          border: '1px solid #E4E7EC',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: MICEPP.gradientPrimary,
          '&:hover': { background: 'linear-gradient(135deg, #007038 0%, #255A2F 100%)' },
        },
      },
    },
  },
});

export default theme;
