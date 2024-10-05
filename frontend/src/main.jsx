import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer /> {/* Add ToastContainer here to enable toast notifications */}
  </StrictMode>
);
