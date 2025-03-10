import { useAuth } from "../context/Auth";
import Cookies from "universal-cookie";
import { apiRequest } from "../utils/apiRequest";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PersistLogin = () => {
  const cookie = new Cookies();
  // get the cuurent user from context
  const auth = useAuth();
  const token = auth.token;

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await apiRequest(`/user/refresh`, "POST");
        // save token in cookie
        const cookie = new Cookies();
        cookie.set("Bearer", res.token);
        // save token & user in context
        const userInfo = { name: res.name, email: res.email };
        auth.login(userInfo);
        auth.setToken(res.token);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    };
    !token ? refreshToken() : setisLoading(false);
  }, []);

  return isLoading ? "Loading ..." : <Outlet />;
};

export default PersistLogin;
