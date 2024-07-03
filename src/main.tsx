import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';
import { HeadProvider } from 'react-head';

import App from './App.tsx';
import WalletConnectProvider from './contexts/WalletConnectProvider.tsx';
import { StoreProvider, store } from './jotai/store.ts';
import './index.css';
import 'aos/dist/aos.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HeadProvider>
    <BrowserRouter>
      <StoreProvider>
        <WalletConnectProvider>
          <DevTools store={store} />
          <App />
        </WalletConnectProvider>
      </StoreProvider>
    </BrowserRouter>
  </HeadProvider>
);
