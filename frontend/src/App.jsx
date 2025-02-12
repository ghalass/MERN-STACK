import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  // const login = useAuthStore((state) => state.login);

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // const user = useAuthStore((state) => state.user);

  // check if user is logged
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));

    // if (user) {
    //   login(user);
    // }

    initializeAuth();
    // console.log(user);
  }, [initializeAuth]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          removeDelay: 1000,
        }}
      />
    </>
  );
};

export default App;
