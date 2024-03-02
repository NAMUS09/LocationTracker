import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import store from "./store/store.ts";
import Protected from "./components/Protected.tsx";
import ProtectedLayout from "./components/ProtectedLayout.tsx";
import ToasterContext from "./context/Toast.tsx";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

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
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ToasterContext />
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
