import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AppProvider from './context/AppContext.jsx';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51OdDEELJvWI9WaXNfpv6F9Cu7Fe8DBHGlJYuFYDoNuDzb7uEBYwesH1oalL3mfeUctywZujS090gyHzPTA2h7vBt006mQwku3w'
);

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
      <ToastContainer position="top-center" />
    </AppProvider>
  </StrictMode>
);
