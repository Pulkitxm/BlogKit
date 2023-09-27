import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This assumes you have a root element in your HTML where your React app will be rendered.
);
