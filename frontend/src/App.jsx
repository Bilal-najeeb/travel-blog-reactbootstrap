import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();


  const hideNavbarRoutes = ['/login', '/signup', '/admindashboard', '/dashboard'];


  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default App;
