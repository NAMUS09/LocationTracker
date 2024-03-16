import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import store from "./store/store.ts";
import Protected from "./components/Auth/Protected.tsx";
import ProtectedLayout from "./components/Layout/ProtectedLayout.tsx";
import ToasterContext from "./context/Toast.tsx";
import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { axiosConfig } from "./axios.ts";
import { logout } from "./store/authSlice.ts";
import toast from "react-hot-toast";

import RegisterPage from "./pages/RegisterPage.tsx";
import AccountPageLayout from "./components/Layout/AccountPageLayout.tsx";
import ProfileInfoPartialPage from "./pages/partialPages/ProfileInfoPartialPage.tsx";
import TrackingPreferencesPartialPage from "./pages/partialPages/TrackingPreferencesPartialPage.tsx";
import LocationHistoryPartialPage from "./pages/partialPages/LocationHistoryPartialPage.tsx";

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
          {
            path: "/account",
            element: <AccountPageLayout />,
            children: [
              {
                path: "/account/",
                element: <Navigate to="profile" />,
              },
              {
                path: "/account/profile",
                element: <ProfileInfoPartialPage />,
              },
              {
                path: "/account/tracking",
                element: <TrackingPreferencesPartialPage />,
              },
              {
                path: "/account/location-history",
                element: <LocationHistoryPartialPage />,
              },
            ],
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
      {
        path: "/register",
        element: (
          <Protected authentication={false}>
            <RegisterPage />
          </Protected>
        ),
      },
    ],
  },
]);

const interceptor = (store: EnhancedStore) => {
  // Add an interceptor to append the JWT token to the request header
  axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.userData.accessToken;

    // If a token exists, add it to the request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // handle all incoming req
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response, config } = error;

      if (response.status !== 401) {
        return Promise.reject(error);
      }

      try {
        const refreshTokenResponse = await axios.post(
          "/user/refresh-token",
          { refreshToken: null },
          axiosConfig
        );

        if (
          refreshTokenResponse.status !== 200 ||
          !refreshTokenResponse.data?.accessToken
        ) {
          throw new Error();
        }

        // Retry the original request with the new access token or cookies
        return axiosClient(config);
      } catch (error) {
        store.dispatch(logout());
        toast.error("Authorization Failed. Please login in");
        return Promise.reject(error);
      }
    }
  );
};

interceptor(store);

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
