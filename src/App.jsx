import React, { useEffect, useState } from 'react';
import VoterRegistrationTable from './components/VoterRegistrationTable';

const LOCAL_API = 'http://127.0.0.1:5000/';

function App() {
  const [data, setData] = useState('Loading...');

  useEffect(() => {
    fetch(LOCAL_API + '/columns')
      .then(response => response.text())
      .then(text => setData(text))
      .catch(error => {
        console.error('Error fetching data:', error);
        setData('Error loading data');
      });
  }, []);

  return (
    <main>
      <h1>TEST</h1>
      <h1>{data}</h1>
      < VoterRegistrationTable></VoterRegistrationTable>
    </main>
  );
}

export default App;
