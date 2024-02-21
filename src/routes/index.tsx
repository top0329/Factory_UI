import { useRoutes } from 'react-router-dom';
import CommonLayout from '../components/Layout/CommonLayout';
import LandingPage from '../pages/LandingPage';
import BlueprintPage from '../pages/BlueprintPage';
import ProductPage from '../pages/ProductPage';
import DecomposePage from '../pages/Decompose';
import WhitepaperPage from '../pages/WhitepaperPage';

// project import
const CommonRoutes = {
  path: '/',
  element: <CommonLayout />,
  children: [
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/blueprint',
      element: <BlueprintPage />,
    },
    {
      path: '/product',
      element: <ProductPage />,
    },
    {
      path: '/decompose',
      element: <DecomposePage />,
    },
    {
      path: '/whitepaper',
      element: <WhitepaperPage />,
    },
  ],
};

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([CommonRoutes]);
}
