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
          <Header />
          <div className="bg-layout px-4 2xl:max-w-[1536px] 2xl:min-w-full xl:px-20 lg:px-16 md:px-12 sm:px-10">
            <Outlet />
          </div>
          <Footer />
        </Suspense>
      )}
    </React.Fragment>
  );
};

export default CommonLayout;
