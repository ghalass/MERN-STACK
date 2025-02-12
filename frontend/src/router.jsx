import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./utils/authUtils";

import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";

import LoaderSpinner from "./components/ui/LoaderSpinner";

import Home from "./pages/Home";
import About from "./pages/About";
import Workouts from "./pages/Workouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";

const Profile = lazy(() => import("./pages/Profile"));

// 🔒 Protected Route
const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);

  if (loading) {
    return <LoaderSpinner message="Vérification d'authentification..." />; // Or show a Spinner component
  }

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
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
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
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <GuestRoute element={<Login />} />,
      },
      {
        path: "/signup",
        element: <GuestRoute element={<Signup />} />,
      },
    ],
  },
]);

export default router;
