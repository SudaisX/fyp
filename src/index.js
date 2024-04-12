import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import PhrasesPage from "./pages/PhrasesPage";
import CategoriesPage from "./pages/CategoriesPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/hi",
//     element: <App />,
//   },
//   {
//     path: "/phrases",
//     element: <PhrasesPage />,
//   },

//   {
//     path: "/categories",
//     element: <CategoriesPage />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
