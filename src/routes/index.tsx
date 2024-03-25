import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import CommonLayout from '../components/Layout/CommonLayout';
import LoadingLandingPage from '../pages/LandingPage/LoadingLanding';
import Loadable from '../components/Loading';

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
const ProductPage = Loadable(lazy(() => import('../pages/Product')));
const MintProductPage = Loadable(
  lazy(() => import('../pages/Product/MintProduct'))
);
const DecomposePage = Loadable(lazy(() => import('../pages/Decompose')));
const DecomposeProductPage = Loadable(
  lazy(() => import('../pages/Decompose/DecomposeProduct'))
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
              element: <MintBlueprintPage />,
            },
            {
              path: 'new',
              element: <NewBlueprintPage />,
            },
            {
              path: 'recreate/:id',
              element: <RecreateBlueprintPage />,
            },
            {
              path: 'update/:id',
              element: <UpdateBlueprintPage />,
            },
            {
              path: 'transfer-ownership/:id',
              element: <TransferOwnership />,
            },
          ],
        },
        {
          path: 'product',
          children: [
            {
              path: '',
              element: <ProductPage />,
            },
            {
              path: 'mint/:id',
              element: <MintProductPage />,
            },
          ],
        },
        {
          path: 'decompose',
          children: [
            {
              path: '',
              element: <DecomposePage />,
            },
            {
              path: 'product/:id',
              element: <DecomposeProductPage />,
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
      ],
    },
  ],
};

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LandingRoute, CommonRoutes]);
}
