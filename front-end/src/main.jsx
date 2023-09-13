import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarWrapper from "./components/NabvarWrapper/NavbarWrapper";
import LandingPage from "./components/LandingPage/LandingPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import BrowsingPage from "./components/BrowsingPage/BrowsingPage";
import Authentification from "./components/Authentification/Authentification";
import HomeNoneVerified from "./components/Authentification/HomeNoneVerified/HomeNoneVerified";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Message from "./components/Message/Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";
import { element } from "prop-types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />
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
        path: "/messages",
        element: <Message />
      },
      {
        path: "/messages/:id",
        element: <div>coucou</div>
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
