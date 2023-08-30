import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrowsingPage from './components/BrowsingPage/BrowsingPage';
import './index.css'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';


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
        ],
    }
])

function NavbarWrapper(){
    const currentPath = window.location.pathname;
    return (
    <div>
      { currentPath !== '/' && <Navbar/>}
      <Outlet/>
      { currentPath !== '/' && <Footer />}
    </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

