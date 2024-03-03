import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const CommonLayout = ({ layout }: { layout?: string }) => {
  return (
    <React.Fragment>
      {layout === 'landing' ? (
        <Suspense>
          <Header />
          <Outlet />
          <Footer />
        </Suspense>
      ) : (
        <Suspense>
          <div>
            <Header />
          </div>
          <div className="px-4 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10">
            <Outlet />
          </div>
          <div className="bg-black w-screen">
            <Footer />
          </div>
        </Suspense>
      )}
    </React.Fragment>
  );
};

export default CommonLayout;
