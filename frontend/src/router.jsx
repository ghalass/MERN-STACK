import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./utils/authUtils";

import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import ConfigsLayout from "./layouts/ConfigsLayout";

import LoaderSpinner from "./components/ui/LoaderSpinner";

const Home = lazy(() => import("./pages/Home"));
// import Workouts from "./pages/Workouts";
const Workouts = lazy(() => import("./pages/Workouts"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Sites = lazy(() => import("./pages/Sites"));
const Configs = lazy(() => import("./pages/Configs"));

// 🔒 Protected Route
const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);

  if (loading) {
    return <LoaderSpinner message="Vérification d'authentification..." />; // Or show a Spinner component
  }

  if (!user || isTokenExpired(user?.token)) {
    // console.warn(
    //   "Token expiré ou utilisateur non authentifié. Redirection vers /login."
    // );
    logout();
    return <Navigate to="/login" replace />;
  }

  return element;
};

// 🚫 Guest Route
const GuestRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/" replace /> : element;
};

const router = createBrowserRouter([
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
            path: "/configs/sites",
            element: (
              <ProtectedRoute
                element={
                  <Suspense>
                    <Sites />
                  </Suspense>
                }
              />
            ),
          },
        ],
      },
    ],
  },
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
