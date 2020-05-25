import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

const Toaster = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={2000}
    transition={Slide}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    style={{ width: '25%', textAlign: 'center' }}
  />
);

export default Toaster;
