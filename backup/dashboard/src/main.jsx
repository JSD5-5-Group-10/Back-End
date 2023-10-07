import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Login } from "./pages/login-registration/Login.jsx";
import { StyledEngineProvider } from "@mui/material/styles";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);