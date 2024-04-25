import { useState, Fragment, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Album } from "./album";
import Expense from "./expense";
import Login from "../Login";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import Signup from "../Signup";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies();
  return cookies.token ? children : <Navigate to="/" />;
};
const routes = createBrowserRouter([
  {
    path: "/expense",
    // Component:Expense,
    element: (
      <ProtectedRoute>
        <Expense />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
