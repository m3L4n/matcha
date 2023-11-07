import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";
import { router } from "./Router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Context/Theme";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      cacheTime: 600000
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);
