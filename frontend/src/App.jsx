import "./assets/App.css";

import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/Auth";

/*** LAYOUTS */
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const GuestLayout = lazy(() => import("./layouts/GuestLayout"));

/*** COMPONENTS */
const Home = lazy(() => import("./pages/Home"));
const Page404 = lazy(() => import("./pages/Page404"));
const Notification = lazy(() => import("./components/ui/Notification"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Login = lazy(() => import("./pages/auth/Login"));

const SaisieRje = lazy(() =>
  import("./pages/performances/saisie_performances/SaisieRje")
);

// ADMIN
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SitesPage = lazy(() => import("./pages/admin/sites/SitesPage"));
const UsersPage = lazy(() => import("./pages/admin/users/UsersPage"));

/*** MIDDLEWARES */
const RequireAuth = lazy(() => import("./components/RequireAuth"));
const RouteRequireAdmin = lazy(() => import("./components/RouteRequireAdmin"));
const PersistLogin = lazy(() => import("./components/PersistLogin"));

const App = () => {
  return (
    <>
      <Notification />

      <ContextProvider>
        <Router>
          <Routes>
            {/* PUBLIC PAGES WITHOUT HEADER */}
            {PUBLIC_PAGES_WITHOUT_HEADER?.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<GuestLayout>{route.element}</GuestLayout>}
              />
            ))}

            {/* PUBLIC PAGES WITH HEADER */}
            {PUBLIC_PAGES_WITH_HEADER?.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<DefaultLayout>{route.element}</DefaultLayout>}
              />
            ))}

            <Route element={<PersistLogin />}>
              {/* ADMIN PAGES */}
              {ADIM_PAGES?.map((route, index) => (
                <Route element={<RouteRequireAdmin />} key={index}>
                  <Route
                    path={route.path}
                    element={<AdminLayout>{route.element}</AdminLayout>}
                  />
                </Route>
              ))}

              {/* REQUIRE AUTH PAGES */}
              {REQUIRE_AUTH_PAGES?.map((route, index) => (
                <Route element={<RequireAuth />} key={index}>
                  <Route
                    path={route.path}
                    element={<DefaultLayout>{route.element}</DefaultLayout>}
                  />
                </Route>
              ))}
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
};

const PUBLIC_PAGES_WITHOUT_HEADER = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Page404 /> },
];

const PUBLIC_PAGES_WITH_HEADER = [
  { path: "/", element: <Home /> },
  { path: "/saisie_performances", element: <SaisieRje /> },
];

const REQUIRE_AUTH_PAGES = [{ path: "/profile", element: <Profile /> }];

const ADIM_PAGES = [
  { path: "/admin", element: <Dashboard /> },
  { path: "/admin/users", element: <UsersPage /> },
  { path: "/admin/sites", element: <SitesPage /> },
];

export default App;
