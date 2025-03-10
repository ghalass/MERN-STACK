// // import { useStateContext } from "../contexts/contextprovider";
// import { Outlet } from "react-router-dom";

// export default function GuestLayout() {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }

const GuestLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default GuestLayout;
