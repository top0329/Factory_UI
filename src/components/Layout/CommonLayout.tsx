import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const CommonLayout = ({ layout }: { layout?: string }) => {
  return (
    <React.Fragment>
      {layout === 'landing' ? (
        <React.Fragment>
          <Header />
          <Outlet />
          <Footer />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header />
          <div className="bg-layout px-4 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full xl:px-20 lg:px-16 md:px-12 sm:px-10">
            <Outlet />
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CommonLayout;
