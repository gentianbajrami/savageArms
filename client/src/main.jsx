import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AppProvider from './context/AppContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
      <ToastContainer position="top-center" />
    </AppProvider>
  </StrictMode>
);
