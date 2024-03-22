import ToastProvider from './contexts/toastContext';
import { Web3Provider } from './contexts/web3Context';
import CoreRoutes from './routes';

function App() {
  return (
    <ToastProvider>
      <Web3Provider>
        <CoreRoutes />
      </Web3Provider>
    </ToastProvider>
  );
}

export default App;
