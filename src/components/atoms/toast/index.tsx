import React from "react";
import { Slide, ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <>
      <ToastContainer
        closeOnClick
        autoClose={2000}
        closeButton={false}
        draggable="mouse"
        newestOnTop
        limit={5}
        position="bottom-right"
        theme="colored"
        transition={Slide}
      />
    </>
  );
};

export default Toast;
