import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer /> {/* Add ToastContainer here to enable toast notifications */}
  </React.StrictMode>
);
