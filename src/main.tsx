import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import store from "./store/store.ts";
import Protected from "./components/Protected.tsx";
import ProtectedLayout from "./components/ProtectedLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <ProtectedLayout />
          </Protected>
        ),
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
