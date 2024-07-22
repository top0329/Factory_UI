import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

import App from './App.tsx';
import WalletConnectProvider from './contexts/WalletConnectProvider.tsx';
import { StoreProvider } from './jotai/store.ts';
import './index.css';
import 'aos/dist/aos.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HeadProvider>
    <BrowserRouter>
      <StoreProvider>
        <WalletConnectProvider>
          <App />
        </WalletConnectProvider>
      </StoreProvider>
    </BrowserRouter>
  </HeadProvider>
);
