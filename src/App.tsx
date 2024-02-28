import Providers from './contexts/RainbowKitProviders';
import CoreRoutes from './routes';

function App() {
  return (
    <Providers>
      <CoreRoutes />
    </Providers>
  );
}

export default App;
