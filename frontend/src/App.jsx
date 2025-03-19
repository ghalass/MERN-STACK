// import "./assets/App.css";
// import { lazy } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ContextProvider } from "./context/Auth";
// import RapportRje from "./pages/performances/rapports_performances/RapportRje";

// /*** LAYOUTS */
// const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
// const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
// const GuestLayout = lazy(() => import("./layouts/GuestLayout"));

// /*** COMPONENTS */
// const Home = lazy(() => import("./pages/Home"));
// const Page404 = lazy(() => import("./pages/Page404"));
// const Notification = lazy(() => import("./components/ui/Notification"));
// const Profile = lazy(() => import("./pages/user/Profile"));
// const Login = lazy(() => import("./pages/auth/Login"));
// const SaisieRje = lazy(() =>
//   import("./pages/performances/saisie_performances/SaisieRje")
// );

// // ADMIN
// const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
// const SitesPage = lazy(() => import("./pages/admin/sites/SitesPage"));
// const UsersPage = lazy(() => import("./pages/admin/users/UsersPage"));

// /*** MIDDLEWARES */
// const RequireAuth = lazy(() => import("./components/RequireAuth"));
// const RouteRequireAdmin = lazy(() => import("./components/RouteRequireAdmin"));
// const PersistLogin = lazy(() => import("./components/PersistLogin"));

// const App = () => {
//   return (
//     <>
//       <Notification />
//       <ContextProvider>
//         <Router>
//           <Routes>
//             {/* Routes Admin (Utilisent AdminLayout) */}
//             <Route element={<RouteRequireAdmin />}>
//               <Route path="/admin/*" element={<AdminLayout />}>
//                 {" "}
//                 {/* Modifié : `/admin/*` pour capturer toutes les sous-routes de `/admin` */}
//                 <Route index element={<Dashboard />} />{" "}
//                 {/* Affiche Dashboard sur `/admin` */}
//                 <Route path="users" element={<UsersPage />} />
//                 <Route path="sites" element={<SitesPage />} />
//               </Route>
//             </Route>

//             {/* Routes publiques sans authentification (Utilisent GuestLayout) */}
//             <Route
//               path="/login"
//               element={
//                 <GuestLayout>
//                   <Login />
//                 </GuestLayout>
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <GuestLayout>
//                   <Page404 />
//                 </GuestLayout>
//               }
//             />

//             {/* Routes nécessitant une authentification (Utilisent DefaultLayout) */}
//             <Route element={<PersistLogin />}>
//               <Route element={<RequireAuth />}>
//                 <Route path="/*" element={<DefaultLayout />}>
//                   {" "}
//                   {/* Modifié : `/*` pour capturer toutes les routes sauf `/admin*` et `/login` */}
//                   <Route index element={<Home />} />
//                   <Route path="saisie_performances" element={<SaisieRje />} />
//                   <Route path="profile" element={<Profile />} />
//                   <Route
//                     path="performances/rapports/rje"
//                     element={<RapportRje />}
//                   />
//                 </Route>
//               </Route>
//             </Route>
//           </Routes>
//         </Router>
//       </ContextProvider>
//     </>
//   );
// };

// export default App;

import "./assets/App.css";
import { lazy, Suspense } from "react"; // Ajout de Suspense pour gérer le chargement paresseux
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom"; // Ajout de Outlet
import { ContextProvider } from "./context/Auth";
import RapportRje from "./pages/performances/rapports_performances/RapportRje";

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
          <Suspense fallback={<div>Chargement...</div>}>
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
                    <Route
                      path="performances/rapports/rje"
                      element={<RapportRje />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ContextProvider>
    </>
  );
};

export default App;
