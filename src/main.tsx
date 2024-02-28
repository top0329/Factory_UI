import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';

import App from './App.tsx';
import './index.css';
import { StoreProvider, store } from './jotai/store.ts';
import Providers from './contexts/RainbowKitProviders.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Providers>
          <DevTools store={store} />
          <App />
        </Providers>
        </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
