import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import "./index.css";
import App from "./App.tsx";

import store from "./store/store.ts";
import Protected from "./components/Auth/Protected.tsx";

import ToasterContext from "./context/Toast.tsx";
import { EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { axiosConfig } from "./axios.ts";
import { logout } from "./store/authSlice.ts";
import toast from "react-hot-toast";

import { Loading } from "./components/index.ts";
import ProtectedLayout from "./components/Layout/ProtectedLayout.tsx";

// lazy loading routes
//public routes
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));

// private routes
// const ProtectedLayout = lazy(
//   () => import("./components/Layout/ProtectedLayout.tsx")
// );
const AccountPageLayout = lazy(
  () => import("./components/Layout/AccountPageLayout.tsx")
);
const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const ProfileInfoPartialPage = lazy(
  () => import("./pages/partialPages/ProfileInfoPartialPage.tsx")
);
const LocationHistoryPartialPage = lazy(
  () => import("./pages/partialPages/LocationHistoryPartialPage.tsx")
);
const TrackingPreferencesPartialPage = lazy(
  () => import("./pages/partialPages/TrackingPreferencesPartialPage.tsx")
);

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
            element: (
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "/account",
            element: (
              <Suspense fallback={<Loading />}>
                <AccountPageLayout />
              </Suspense>
            ),
            children: [
              {
                path: "/account/",
                element: <Navigate to="profile" />,
              },
              {
                path: "/account/profile",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ProfileInfoPartialPage />
                  </Suspense>
                ),
              },
              {
                path: "/account/tracking",
                element: (
                  <Suspense fallback={<Loading />}>
                    <TrackingPreferencesPartialPage />
                  </Suspense>
                ),
              },
              {
                path: "/account/location-history",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LocationHistoryPartialPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          </Protected>
        ),
      },

      {
        path: "/register",
        element: (
          <Protected authentication={false}>
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          </Protected>
        ),
      },
    ],
  },
]);

const interceptor = (store: EnhancedStore) => {
  // Add an interceptor to append the JWT token to the request header
  axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.userData?.accessToken;

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
