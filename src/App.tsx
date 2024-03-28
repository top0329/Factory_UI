import ToastProvider from './contexts/toastContext';
import SpinnerProvider from './contexts/spinnerContext';
import CoreRoutes from './routes';
import { Web3Provider } from './contexts/web3Context';

function App() {
  return (
    <Web3Provider>
      <SpinnerProvider>
        <ToastProvider>
          <CoreRoutes />
        </ToastProvider>
      </SpinnerProvider>
    </Web3Provider>
  );
}

export default App;
