import ToastProvider from './contexts/toastContext';
import SpinnerProvider from './contexts/spinnerContext';
import CoreRoutes from './routes';
import { Web3Provider } from './contexts/web3Context';

function App() {
  return (
        <ToastProvider>
    <SpinnerProvider>
      <Web3Provider>
          <CoreRoutes />
      </Web3Provider>
    </SpinnerProvider>
        </ToastProvider>
  );
}

export default App;
