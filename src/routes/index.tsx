import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import CommonLayout from '../components/Layout/CommonLayout';
import LoadingLandingPage from '../pages/LandingPage/LoadingLanding';
import Loadable from '../components/Loading';
import AuthGuard from './AuthGuard';
import PageNotFound from '../pages/PageNotFound';

// const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const BlueprintPage = Loadable(lazy(() => import('../pages/Blueprint')));
const MintBlueprintPage = Loadable(
  lazy(() => import('../pages/Blueprint/MintBlueprint'))
);
const NewBlueprintPage = Loadable(
  lazy(() => import('../pages/Blueprint/NewBlueprint'))
);
const RecreateBlueprintPage = Loadable(
  lazy(() => import('../pages/Blueprint/RecreateBlueprint'))
);
const UpdateBlueprintPage = Loadable(
  lazy(() => import('../pages/Blueprint/UpdateBlueprint'))
);
const TransferOwnership = Loadable(
  lazy(() => import('../pages/Blueprint/TransferOwnership'))
);
const MyBlueprint = Loadable(lazy(() => import('../pages/MyBlueprint')));
const MintProductPage = Loadable(
  lazy(() => import('../pages/MyBlueprint/MintProduct'))
);
const Product = Loadable(lazy(() => import('../pages/Product')));
const DecomposeProductPage = Loadable(
  lazy(() => import('../pages/Product/DecomposeProduct'))
);
const ComponentPage = Loadable(lazy(() => import('../pages/Component')));

// project import
const LandingRoute = {
  path: '/',
  element: <CommonLayout layout="landing" />,
  children: [
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingLandingPage />}>
          <LandingPage />
        </Suspense>
      ),
    },
  ],
};

const CommonRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <CommonLayout />,
      children: [
        {
          path: 'blueprint',
          children: [
            {
              path: '',
              element: <BlueprintPage />,
            },
            {
              path: 'mint/:id',
              element: (
                <AuthGuard>
                  <MintBlueprintPage />
                </AuthGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <AuthGuard>
                  <NewBlueprintPage />
                </AuthGuard>
              ),
            },
            {
              path: 'recreate/:id',
              element: (
                <AuthGuard>
                  <RecreateBlueprintPage />
                </AuthGuard>
              ),
            },
            {
              path: 'update/:id',
              element: (
                <AuthGuard>
                  <UpdateBlueprintPage />
                </AuthGuard>
              ),
            },
            {
              path: 'transfer-ownership/:id',
              element: (
                <AuthGuard>
                  <TransferOwnership />
                </AuthGuard>
              ),
            },
          ],
        },
        {
          path: 'my-blueprint',
          children: [
            {
              path: '',
              element: (
                <AuthGuard>
                  <MyBlueprint />
                </AuthGuard>
              ),
            },
            {
              path: 'mint/:id',
              element: (
                <AuthGuard>
                  <MintProductPage />
                </AuthGuard>
              ),
            },
          ],
        },
        {
          path: 'product',
          children: [
            {
              path: '',
              element: (
                <AuthGuard>
                  <Product />
                </AuthGuard>
              ),
            },
            {
              path: 'decompose/:id',
              element: (
                <AuthGuard>
                  <DecomposeProductPage />
                </AuthGuard>
              ),
            },
          ],
        },
        {
          path: 'component',
          children: [
            {
              path: '',
              element: <ComponentPage />,
            },
          ],
        },
        {
          path: '*',
          element: <PageNotFound />,
        },
      ],
    },
  ],
};

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LandingRoute, CommonRoutes]);
}
