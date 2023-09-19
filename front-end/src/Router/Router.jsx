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
import { NoneConnectedRoute } from "./NoneConnectedRoute";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element:
          <NoneConnectedRoute>
            <LandingPage />
          </NoneConnectedRoute>
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
          element: 
          <PrivateRoute>
          <div>Profile</div>
          </PrivateRoute>
        },
        {
          path: "/message",
          element:
          <PrivateRoute>
           <div>Message</div>
           </PrivateRoute>
        },
        {
          path: "/register",
          element:
          <NoneConnectedRoute>
          <Authentification />
          </NoneConnectedRoute>
        },
        {
          path: "/login",
          element: 
          <NoneConnectedRoute>
          <Authentification />
          </NoneConnectedRoute>
        },
        {
          path: "/reset",
          element:
          <NoneConnectedRoute>
           <HomeNoneVerified />
          </NoneConnectedRoute>
        },
        {
          path: "/reset-password",
          element: 
          <NoneConnectedRoute>
          <ResetPassword />
          </NoneConnectedRoute>
        },
        {
          path: "/reset-password/:id",
          element: 
          <NoneConnectedRoute>
          <ResetPassword />
          </NoneConnectedRoute>
        }
      ]
    }
  ]);
