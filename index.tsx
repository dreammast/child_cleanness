import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add Google Fonts link to index.html instead of using @fontsource
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 