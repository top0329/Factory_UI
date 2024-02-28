import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';

import App from './App.tsx';
import './index.css';
import { StoreProvider, store } from './jotai/store.ts';
import WalletConnectProvider from './contexts/WalletConnectProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <WalletConnectProvider>
          <DevTools store={store} />
          <App />
        </WalletConnectProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
