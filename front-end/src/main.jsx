import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrowsingPage from './components/BrowsingPage/BrowsingPage';
import Authentification from './Components/Authentification/Authentification';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/browsing',
    element: <BrowsingPage />,
  },{
    path: '/register',
    element: <Authentification/>
  },{

    path: '/login',
    element: <Authentification/>,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
