import { createBrowserRouter } from "react-router-dom";
import NavbarWrapper from "components/NabvarWrapper/NavbarWrapper";
import LandingPage from "components/LandingPage/LandingPage";
import ErrorPage from "components/ErrorPage/ErrorPage";
import BrowsingPage from "components/BrowsingPage/BrowsingPage";
import Authentification from "components/Authentification/Authentification";
import HomeNoneVerified from "components/Authentification/HomeNoneVerified/HomeNoneVerified";
import ResetPassword from "components/ResetPassword/ResetPassword";
import { PrivateRoute } from "./ProtectedRoute";
import { NoneConnectedRoute } from "./NoneConnectedRoute";
import ConversationPicker from "src/components/Message/ConversationPicker";
import Profile from "components/Profile/Profile";
import Notification from "components/Notifications/Notification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <NoneConnectedRoute>
            <LandingPage />
          </NoneConnectedRoute>
        )
      },
      {
        path: "/match",
        element: (
          <PrivateRoute>
            <BrowsingPage />
          </PrivateRoute>
        )
      },
      {
        path: "/profile/:id",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: "/message",
        element: (
          <PrivateRoute>
            <ConversationPicker />
          </PrivateRoute>
        )
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute>
            <Notification />
          </PrivateRoute>
        )
      },
      {
        path: "/register",
        element: (
          <NoneConnectedRoute>
            <Authentification />
          </NoneConnectedRoute>
        )
      },
      {
        path: "/login",
        element: (
          <NoneConnectedRoute>
            <Authentification />
          </NoneConnectedRoute>
        )
      },
      {
        path: "/reset",
        element: <HomeNoneVerified />
      },
      {
        path: "/reset",
        element: <HomeNoneVerified />
      },
      {
        path: "/reset-password",
        element: (
          <NoneConnectedRoute>
            <ResetPassword />
          </NoneConnectedRoute>
        )
      },
      {
        path: "/reset-password/:id",
        element: (
          <NoneConnectedRoute>
            <ResetPassword />
          </NoneConnectedRoute>
        )
      }
    ]
  }
]);
