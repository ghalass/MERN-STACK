// import axios from "axios";
// import { useEffect } from "react";
// import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import axiosClient from "../axiosClient";
// import { useStateContext } from "../contexts/contextprovider";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
  // const { token, setUser } = useStateContext();
  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // useEffect(() => {
  //   axiosClient.get("/user").then(({ data }) => {
  //     setUser(data);
  //   });
  // }, []);

  return (
    <>
      {/* <Header /> */}
      <span>Header</span>

      {/* <Sidebar /> */}
      <span>Sidebar</span>

      <Outlet />
    </>
  );
}
