// import { Outlet } from "react-router-dom";
// import Header from "../components/Header";

// export default function DefaultLayout() {
//   return (
//     <>
//       <Header />

//       <div className="container-fluid">
//         <Outlet />
//       </div>
//     </>
//   );
// }

import Header from "../components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
