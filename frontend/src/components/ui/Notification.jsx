import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { Toaster } from "react-hot-toast";

const Notification = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          removeDelay: 1000,
        }}
      />
    </>
  );
};

export default Notification;
