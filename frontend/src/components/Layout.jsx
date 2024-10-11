import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='max-w-[1700px] m-auto mt-12'>
        <Navbar />
        <Outlet /> 
        <Footer />
    </div>
  );
};

export default Layout;
