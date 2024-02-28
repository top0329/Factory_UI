import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';

import App from './App.tsx';
import './index.css';
import { StoreProvider, store } from './jotai/store.ts';
import RainbowKitProvider from './contexts/RainbowKitProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <RainbowKitProvider>
          <DevTools store={store} />
          <App />
        </RainbowKitProvider>
        </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
