import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";

import "./assets/App.css";

const App = () => {
  // Quand la page est réactualisée, il faut initialiser l'user
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
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
