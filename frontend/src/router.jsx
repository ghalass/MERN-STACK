import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./utils/authUtils";

import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import ConfigsLayout from "./layouts/ConfigsLayout";
import PerformancesLayout from "./layouts/PerformancesLayout";

import LoaderSpinner from "./components/ui/LoaderSpinner";

const Home = lazy(() => import("./pages/Home"));
const Workouts = lazy(() => import("./pages/Workouts"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Performances = lazy(() => import("./pages/Performances"));

const Configs = lazy(() => import("./pages/Configs"));
const LubrifiantsList = lazy(() =>
  import("./components/configs/lubrifiants/LubrifiantsList")
);

const SaisieRje = lazy(() => import("./components/performances/SaisieRje"));

// import Cookies from "js-cookie";

// const accessToken = Cookies.get("accessToken");

// 🔒 Protected Route
const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);

  if (loading) {
    return <LoaderSpinner message="Vérification d'authentification..." />; // Or show a Spinner component
  }

  // const accessToken = Cookies.get("accessToken");

  if (!user || isTokenExpired(user?.token)) {
    console.warn(
      "Token expiré ou utilisateur non authentifié. Redirection vers /login."
    );
    logout();
    return <Navigate to="/login" replace />;
  }

  return element;
};

// 🚫 Guest Route
const GuestRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/" replace /> : element;
  // return accessToken ? <Navigate to="/" replace /> : element;
};

const router = createBrowserRouter([
  //
  //
  //
  //
  // DefaultLayout

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/workouts",
        element: <ProtectedRoute element={<Workouts />} />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
        ),
      },

      //
      //
      //
      //
      // ConfigsLayout
      {
        path: "/configs",
        element: <ConfigsLayout />,
        children: [
          {
            path: "/configs",
            element: (
              <ProtectedRoute
                element={
                  <Suspense>
                    <Configs />
                  </Suspense>
                }
              />
            ),
          },
          {
            path: "/configs/lubrifiants",
            element: (
              <ProtectedRoute
                element={
                  <Suspense>
                    <LubrifiantsList />
                  </Suspense>
                }
              />
            ),
          },
        ],
      },

      //

      //
      //
      //
      //
      // PerformancesLayout
      {
        path: "/performances",
        element: <PerformancesLayout />,
        children: [
          {
            path: "/performances",
            element: (
              <ProtectedRoute
                element={
                  <Suspense>
                    <Performances />
                  </Suspense>
                }
              />
            ),
          },
          {
            path: "/performances/saisierje",
            element: (
              <ProtectedRoute
                element={
                  <Suspense>
                    <SaisieRje />
                  </Suspense>
                }
              />
            ),
          },
        ],
      },
    ],
  },
  //
  //
  //
  //
  // GUEST
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: (
          <GuestRoute
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "/signup",
        element: (
          <GuestRoute
            element={
              <Suspense>
                <Signup />
              </Suspense>
            }
          />
        ),
      },
    ],
  },
]);

export default router;
