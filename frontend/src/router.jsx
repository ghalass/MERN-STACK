import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";

// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Workouts from "./pages/Workouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authStore";
import { isTokenExpired } from "./utils/authUtils";
// import Sites from "./pages/sites/Sites";
// import Typeparcs from "./pages/typeparcs/Typeparcs";

// 🔒 Route protégée pour les utilisateurs connectés
const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user || isTokenExpired(user.token)) {
    // console.warn(
    //   "Token expiré ou utilisateur non authentifié. Redirection vers /login."
    // );

    // remove user from global state
    logout();

    // remove user from storage
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  return element;
};

// 🚫 Route accessible uniquement aux invités (empêche les utilisateurs connectés d'accéder à /login et /signup)
const GuestRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/" replace /> : element;
};

// 🔀 Configuration des routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/workouts", element: <ProtectedRoute element={<Workouts />} /> }, // Protégé

      // {
      //   path: "/configs/sites",
      //   element: <Sites />,
      // },
      // {
      //   path: "/configs/typeparcs",
      //   element: <Typeparcs />,
      // },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <GuestRoute element={<Login />} /> }, // Protégé pour les invités
      { path: "/signup", element: <GuestRoute element={<Signup />} /> }, // Protégé pour les invités
    ],
  },
]);

export default router;
