import { Toaster } from "react-hot-toast";

import "./assets/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/Auth";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/user/Profile";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import SitesPage from "./pages/admin/sites/SitesPage";
import UsersPage from "./pages/admin/users/UsersPage";

const App = () => {
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

              {/* ADMIN ******************************************************/}
              {/* 🔒 Protected Route - Only Authenticated Users Can Access */}
              <Route element={<RequireAdmin />}>
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
              </Route>

              <Route element={<RequireAdmin />}>
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
              </Route>

              <Route element={<RequireAdmin />}>
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
              </Route>

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

            {/* PUBLIC ******************************************************/}
            {/* PUBLIC */}
            {/* PUBLIC */}
            {/* PUBLIC */}

            {/* PUBLIC PAGES WITHOUT HEADER */}
            <Route
              path="/login"
              element={
                <GuestLayout>
                  <Login />
                </GuestLayout>
              }
            />

            {/* <Route
              path="/signup"
              element={
                <GuestLayout>
                  <Signup />
                </GuestLayout>
              }
            /> */}

            {/* 404 Page */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
};

export default App;
