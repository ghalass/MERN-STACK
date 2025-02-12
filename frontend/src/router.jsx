import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./utils/authUtils";

// Lazy load pages and layouts
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const GuestLayout = lazy(() => import("./layouts/GuestLayout"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Workouts = lazy(() => import("./pages/Workouts"));

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const LoaderSpinner = () => {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      <p>Chargement ...</p>
      <p className="text-primary">Veuillez patienter</p>
    </div>
  );
};

// 🔒 Protected Route
const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);

  if (loading) {
    return <p>Chargement...</p>; // Or show a Spinner component
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

// 🔀 Router Configuration with Suspense
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/workouts",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <ProtectedRoute element={<Workouts />} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <GuestLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <GuestRoute element={<Login />} />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <GuestRoute element={<Signup />} />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
