import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense, lazy } from 'react';

// Lazy load components for code-splitting
const HeaderComponent = lazy(() => import('./components/HeaderComponent'));
const VoterRegistrationTableComponent = lazy(() => import('./components/VoterRegistrationTableComponent'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
);

// Memoize theme creation to prevent recreation on every render
const customTheme = createTheme({
  typography: {
    fontFamily: [
      'Raleway',
      "Helvetica Neue",
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    // Override h2
    h2: {
      fontSize: '4rem',
      fontWeight: 700,
      color: '#262d7d',
    }
  },
});

function App() {
  return (
    <main>
      <ThemeProvider theme={customTheme}>
        <Suspense fallback={<LoadingFallback />}>
          <HeaderComponent />
          <VoterRegistrationTableComponent />
        </Suspense>
      </ThemeProvider>
    </main>
  );
}

export default App;
