import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full ml-16 md:ml-56'>
        <Header />
        <div className='p-4'>
          <Outlet /> {/* This will render child routes */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
