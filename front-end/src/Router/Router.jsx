import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarWrapper from "components/NabvarWrapper/NavbarWrapper";
import LandingPage from "components/LandingPage/LandingPage";
import ErrorPage from "components/ErrorPage/ErrorPage";
import BrowsingPage from "components/BrowsingPage/BrowsingPage";
import Authentification from "components/Authentification/Authentification";
import HomeNoneVerified from "components/Authentification/HomeNoneVerified/HomeNoneVerified";
import ResetPassword from "components/ResetPassword/ResetPassword";
import { PrivateRoute } from "./ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "src/Context/AuthContext";


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
          element:
          <PrivateRoute>
           <BrowsingPage />
          </PrivateRoute>
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
          element:
          <PrivateRoute>
           <HomeNoneVerified />
           </PrivateRoute>
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
