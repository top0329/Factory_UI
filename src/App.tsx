import ToastProvider from './contexts/toastContext';
import SpinnerProvider from './contexts/spinnerContext';
import CoreRoutes from './routes';
import { Web3Provider } from './contexts/web3Context';

function App() {
  return (
    <SpinnerProvider>
      <ToastProvider>
        <Web3Provider>
          <CoreRoutes />
        </Web3Provider>
      </ToastProvider>
    </SpinnerProvider>
  );
}

export default App;
