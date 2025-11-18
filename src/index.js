import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Use StrictMode only in development to detect side effects
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  const React = require('react');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}
