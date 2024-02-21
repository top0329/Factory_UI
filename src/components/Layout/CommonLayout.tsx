import React, { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const CommonLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="px-6 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CommonLayout;
