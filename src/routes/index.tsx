import { useRoutes } from 'react-router-dom';
import CommonLayout from '../components/Layout/CommonLayout';
import LandingPage from '../pages/LandingPage';
import BlueprintPage from '../pages/Blueprint';
import ProductPage from '../pages/Product';
import DecomposePage from '../pages/Decompose';
import DecomposeProductPage from '../pages/Decompose/DecomposeProduct';
import MintBlueprintPage from '../pages/Blueprint/MintBlueprint';
import NewBlueprintPage from '../pages/Blueprint/NewBlueprint';
import RecreateBlueprintPage from '../pages/Blueprint/RecreateBlueprint';
import UpdateBlueprintPage from '../pages/Blueprint/UpdateBlueprint';
import MintProductPage from '../pages/Product/MintProduct';

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
              path: 'mint',
              element: <MintBlueprintPage />,
            },
            {
              path: 'new',
              element: <NewBlueprintPage />,
            },
            {
              path: 'recreate',
              element: <RecreateBlueprintPage />,
            },
            {
              path: 'update',
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
