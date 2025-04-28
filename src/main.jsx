import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import TripDetails from './create-trip/trip-details/index.jsx'
import Headers from './components/custom/Header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authcontext'; // Import AuthProvider

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/create-trip',
      element: <CreateTrip />,
    },
    {
      path: '/trip-details',
      element: <TripDetails />,
    },
  ],
  {
    basename: '/AI-TRAVEL-Planner',
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <AuthProvider> {/* Add this back to wrap the RouterProvider */}
        <Headers />
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);