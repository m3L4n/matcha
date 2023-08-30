import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavbarWrapper from './components/NabvarWrapper/NavbarWrapper';
import LandingPage from './components/LandingPage/LandingPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrowsingPage from './components/BrowsingPage/BrowsingPage';
import './index.css'

const router = createBrowserRouter([
    {
        path: "/", 
        element: <NavbarWrapper/>,
        errorElement: <ErrorPage />,
        children:[
             {
                 path: "/",
                 element: <LandingPage/>
             },
             {
                 path: "/match",
                 element: <BrowsingPage/>
             },
             {
               path: "/profile",
               element: <div>Profile</div>
             },
             {
               path: "/message",
               element: <div>Message</div>
             },
        ],
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

