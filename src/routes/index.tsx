import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import CommonLayout from '../components/Layout/CommonLayout';
import Loadable from '../components/Loading';
import AuthGuard from './AuthGuard';

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
const TransferOwnershipPage = Loadable(
  lazy(() => import('../pages/Blueprint/TransferOwnership'))
);
const MyBlueprintPage = Loadable(lazy(() => import('../pages/MyBlueprint')));
const MintProductPage = Loadable(
  lazy(() => import('../pages/MyBlueprint/MintProduct'))
);
const ProductPage = Loadable(lazy(() => import('../pages/Product')));
const DecomposeProductPage = Loadable(
  lazy(() => import('../pages/Product/DecomposeProduct'))
);
const ComponentPage = Loadable(lazy(() => import('../pages/Component')));
const LoadingLandingPage = Loadable(
  lazy(() => import('../pages/LandingPage/LoadingLanding'))
);
const PageNotFoundPage = Loadable(
  lazy(() => import('../pages/Maintenance/PageNotFound'))
);
const ContactUsPage = Loadable(
  lazy(() => import('../pages/Maintenance/Contact'))
);
const TermsPage = Loadable(lazy(() => import('../pages/Maintenance/Terms')));
const PrivacyPage = Loadable(
  lazy(() => import('../pages/Maintenance/Privacy'))
);

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
                  <TransferOwnershipPage />
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
                  <MyBlueprintPage />
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
                // <AuthGuard>
                <ProductPage />
                // </AuthGuard>
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
          path: 'contact-us',
          element: <ContactUsPage />,
        },
        {
          path: 'terms',
          element: <TermsPage />,
        },
        {
          path: 'privacy',
          element: <PrivacyPage />,
        },
        {
          path: '*',
          element: <PageNotFoundPage />,
        },
      ],
    },
  ],
};

export default function ThemeRoutes() {
  return useRoutes([LandingRoute, CommonRoutes]);
}
