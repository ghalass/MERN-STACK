import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  // check if user is logged
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) login(user);
  }, []);

  return <></>;
};

export default App;
