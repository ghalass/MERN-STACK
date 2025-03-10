// import { useEffect } from "react";
// import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";

import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/Auth";
// import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/user/Profile";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import UsersPage from "./pages/admin/users/UsersPage";
import SitesPage from "./pages/admin/sites/SitesPage";

const App = () => {
  // Quand la page est réactualisée, il faut initialiser l'user
  // const initializeAuth = useAuthStore((state) => state.initializeAuth);
  // useEffect(() => {
  //   initializeAuth();
  // }, [initializeAuth]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          removeDelay: 1000,
        }}
      />
      <ContextProvider>
        <Router>
          <Routes>
            <Route element={<PersistLogin />}>
              {/* Pages avec Header */}
              <Route
                path="/"
                element={
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                }
              />

              <Route
                path="/admin"
                element={
                  <DefaultLayout>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <DefaultLayout>
                    <AdminLayout>
                      <UsersPage />
                    </AdminLayout>
                  </DefaultLayout>
                }
              />

              <Route
                path="/admin/sites"
                element={
                  <DefaultLayout>
                    <AdminLayout>
                      <SitesPage />
                    </AdminLayout>
                  </DefaultLayout>
                }
              />

              {/* 🔒 Protected Route - Only Authenticated Users Can Access */}

              <Route element={<RequireAuth />}>
                <Route
                  path="/profile"
                  element={
                    <DefaultLayout>
                      <Profile />
                    </DefaultLayout>
                  }
                />
              </Route>
            </Route>

            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* Public Pages without Header */}
            <Route
              path="/login"
              element={
                <GuestLayout>
                  <Login />
                </GuestLayout>
              }
            />

            <Route
              path="/signup"
              element={
                <GuestLayout>
                  <Signup />
                </GuestLayout>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
};

export default App;
