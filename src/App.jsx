import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header'
import VoterRegistrationTable from './components/VoterRegistrationTable';

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
      fontStyle: 'normal',
      color: '#262d7d',
    }
  },
});

function App() {
  return (
    <main>
      <ThemeProvider theme={customTheme}>
        < Header></Header>
        < VoterRegistrationTable></VoterRegistrationTable>
      </ThemeProvider>
    </main>
  );
}

export default App;
