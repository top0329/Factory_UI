import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import CommonLayout from '../components/Layout/CommonLayout';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const BlueprintPage = lazy(() => import('../pages/Blueprint'));
const MintBlueprintPage = lazy(
  () => import('../pages/Blueprint/MintBlueprint')
);
const NewBlueprintPage = lazy(() => import('../pages/Blueprint/NewBlueprint'));
const RecreateBlueprintPage = lazy(
  () => import('../pages/Blueprint/RecreateBlueprint')
);
const UpdateBlueprintPage = lazy(
  () => import('../pages/Blueprint/UpdateBlueprint')
);
const ProductPage = lazy(() => import('../pages/Product'));
const MintProductPage = lazy(() => import('../pages/Product/MintProduct'));
const DecomposePage = lazy(() => import('../pages/Decompose'));
const DecomposeProductPage = lazy(
  () => import('../pages/Decompose/DecomposeProduct')
);

// project import
const LandingRoute = {
  path: '/',
  element: <CommonLayout layout="landing" />,
  children: [{ path: '/', element: <LandingPage /> }],
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
              path: 'mint',
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
              path: 'product',
              element: <DecomposeProductPage />,
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
