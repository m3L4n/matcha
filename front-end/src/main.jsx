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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";
import { router } from "./Router/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
