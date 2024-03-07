import { Web3Provider } from "./contexts/web3Context";
import CoreRoutes from "./routes";
// import 'dotenv/config';

function App() {
  return (
    <Web3Provider>
      <CoreRoutes />
    </Web3Provider>
  );
}

export default App;
