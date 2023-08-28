import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrowsingPage from './components/BrowsingPage/BrowsingPage';
import './index.css'
import Footer from './components/Footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/browsing',
    element: <BrowsingPage />,
  }
]);

const currentPath = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    { currentPath !== '/' && <Footer />}
  </React.StrictMode>,
)
