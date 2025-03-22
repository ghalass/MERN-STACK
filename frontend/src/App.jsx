import "./assets/App.css";
import { lazy, Suspense } from "react"; // Ajout de Suspense pour gérer le chargement paresseux
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Ajout de Outlet
import { AuthProvider } from "./context/Auth";
import TypeparcsPage from "./pages/admin/typeparcs/TypeparcsPage";

/*** LAYOUTS */
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const GuestLayout = lazy(() => import("./layouts/GuestLayout"));
const PerformancesLayout = lazy(() => import("./layouts/PerformancesLayout"));

/*** COMPONENTS */
const Home = lazy(() => import("./pages/Home"));
const Page404 = lazy(() => import("./pages/Page404"));
const Notification = lazy(() => import("./components/ui/Notification"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Login = lazy(() => import("./pages/auth/Login"));
const SaisieRje = lazy(() =>
  import("./pages/performances/saisie_performances/SaisieRje")
);
const RapportRje = lazy(() =>
  import("./pages/performances/rapports_performances/RapportRje")
);
const LoaderSpinner = lazy(() => import("./components/ui/LoaderSpinner"));

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
      <AuthProvider>
        <Router>
          <Suspense
            fallback={
              <div>
                <LoaderSpinner />
              </div>
            }
          >
            {" "}
            {/* Ajout de Suspense pour gérer le chargement paresseux */}
            <Routes>
              {/* Routes Admin (Utilisent AdminLayout) */}
              <Route element={<RouteRequireAdmin />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />{" "}
                  {/* Affiche Dashboard sur `/admin` */}
                  <Route path="users" element={<UsersPage />} />
                  <Route path="sites" element={<SitesPage />} />
                  <Route path="typeparcs" element={<TypeparcsPage />} />
                </Route>
              </Route>

              {/* Routes publiques sans authentification (Utilisent GuestLayout) */}
              <Route
                path="/login"
                element={
                  <GuestLayout>
                    <Login />
                  </GuestLayout>
                }
              />
              <Route
                path="*"
                element={
                  <GuestLayout>
                    <Page404 />
                  </GuestLayout>
                }
              />

              {/* Routes nécessitant une authentification (Utilisent DefaultLayout) */}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                  <Route path="/*" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="saisie_performances" element={<SaisieRje />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="performances" element={<PerformancesLayout />}>
                      {/* <Route
                        path="performances/rapports/rje"
                        element={<RapportRje />}
                      /> */}
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
