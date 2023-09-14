import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarWrapper from "./components/NabvarWrapper/NavbarWrapper";
import LandingPage from "./components/LandingPage/LandingPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import BrowsingPage from "./components/BrowsingPage/BrowsingPage";
import Authentification from "./components/Authentification/Authentification";
import HomeNoneVerified from "./components/Authentification/HomeNoneVerified/HomeNoneVerified";
import ResetPassword from "./components/ResetPassword/ResetPassword";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: 
            <LandingPage />
        },
        {
          path: "/match",
          element: <BrowsingPage />
        },
        {
          path: "/profile",
          element: <div>Profile</div>
        },
        {
          path: "/message",
          element: <div>Message</div>
        },
        {
          path: "/register",
          element: <Authentification />
        },
        {
          path: "/login",
          element: <Authentification />
        },
        {
          path: "/reset",
          element: <HomeNoneVerified />
        },
        {
          path: "/reset-password",
          element: <ResetPassword />
        },
        {
          path: "/reset-password/:id",
          element: <ResetPassword />
        }
      ]
    }
  ]);
