import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense, lazy, useEffect } from 'react';

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
  // Enable back/forward cache by avoiding unload handlers
  useEffect(() => {
    // Prevent any unload handlers that would disable bfcache
    const handleBeforeUnload = () => {
      // Don't prevent default - let the browser handle it
      // This allows bfcache to work
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
