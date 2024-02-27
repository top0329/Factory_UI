import CoreRoutes from './routes';
import BlueprintInfoCard from './components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import BlueprintUpdateCard from './components/Cards/BlueprintInfoCard/BlueprintUpdateCard';
import AdvancedFilter from './components/SearchBar/AdvancedFilter';
import SortBy from './components/SearchBar/AdvancedSort';
import ApproveBlueprintModal from './components/Modals/ApproveBlueprintModal';
import MintProductModal from './components/Modals/MintProductModal';
import DecomposeProductModal from './components/Modals/DecomposeProductModal';
import OwnBlueprintCard from './components/Cards/BlueprintCard/OwnBlueprintCard';
import { ProductBlueprintCard } from './components/Cards/BlueprintCard/ProductCard';
import { ERC20DecomposeListCard } from './components/Cards/ListCard/ERC20ListCard';
import { ERC721DecomposeListCard } from './components/Cards/ListCard/ERC721ListCard';
import { ERC1155DecomposeListCard } from './components/Cards/ListCard/ERC1155ListCard';
import { ERC20MintListCard } from './components/Cards/ListCard/ERC20ListCard';
import { ERC721MintListCard } from './components/Cards/ListCard/ERC721ListCard';
import { ERC1155MintListCard } from './components/Cards/ListCard/ERC1155ListCard';

import '@rainbow-me/rainbowkit/styles.css';
// import { createConfig, configureChains, WagmiProvider } from 'wagmi';
import { WagmiProvider } from 'wagmi';

import {
  getDefaultConfig,
  RainbowKitProvider,
  // connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import {
//   injectedWallet,
//   metaMaskWallet,
//   trustWallet,
//   walletConnectWallet,
//   ledgerWallet,
// } from '@rainbow-me/rainbowkit/wallets';
import { bsc, sepolia } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';

import copper from './assets/images/development/copper_ERC20.webp';
import key721 from './assets/images/development/key_ERC721.webp';
import axeIron from './assets/images/development/axe_iron_wood_ERC1155.webp';
import pickAxe from './assets/images/development/pickaxe_iron_wood_ERC1155.webp';
import woodShield from './assets/images/development/Shield_wood_ERC1155.webp';
import ironShield from './assets/images/development/Shield_iron_ERC1155.webp';
import BlueprintCard from './components/Cards/BlueprintCard/BlueprintCard';

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [bsc, sepolia],
//   [publicProvider()]
// );

const config = getDefaultConfig({
  appName: 'Factory',
  projectId: '3070123cded233b935f75e5531756a6a',
  chains: [bsc, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Popular',
//       wallets: [injectedWallet, metaMaskWallet, ledgerWallet, trustWallet],
//     },
//     {
//       groupName: 'recommended',
//       wallets: [walletConnectWallet],
//     },
//   ],
//   {
//     appName: 'Factory',
//     projectId: '3070123cded233b935f75e5531756a6a',
//   }
// );

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Popular',
//     wallets: [
//       injectedWallet({ chains }),
//       metaMaskWallet({ projectId: '3070123cded233b935f75e5531756a6a', chains }),
//       ledgerWallet({ projectId: '3070123cded233b935f75e5531756a6a', chains }),
//       trustWallet({ projectId: '3070123cded233b935f75e5531756a6a', chains }),
//     ],
//   },
//   {
//     groupName: 'Recommended',
//     wallets: [
//       walletConnectWallet({
//         projectId: '3070123cded233b935f75e5531756a6a',
//         chains,
//       }),
//     ],
//   },
// ]);

// const wagmiConfig = createConfig({
//   connectors,

//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
// });

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex flex-col gap-2 justify-center items-center">
            <BlueprintCard
              uri={copper}
              name="copper"
              blueprintid={5}
              totalSupply={10000}
              mintPrice={1000}
              mintLimit={100}
              myCardBadge={true}
              button={true}
            />

            <ApproveBlueprintModal />
            <DecomposeProductModal />

            <MintProductModal />

            <ERC20DecomposeListCard
              uri={pickAxe}
              type={'Blueprint'}
              name={'PickAxe Blueprint'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              amount={100}
            />
            <ERC721DecomposeListCard
              uri={copper}
              type={'ERC20'}
              name={'Copper ERC20'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              id={3}
            />
            <ERC1155DecomposeListCard
              uri={key721}
              type={'ERC721'}
              name={'Key 721'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              id={3}
              amount={100}
            />

            <ERC20MintListCard
              uri={copper}
              type={'ERC20'}
              name={'Copper ERC20'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              amount={100}
            />
            <ERC721MintListCard
              uri={key721}
              type={'ERC721'}
              name={'Key 721'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              id={3}
            />
            <ERC1155MintListCard
              uri={axeIron}
              type={'ERC1155'}
              name={'Axe Iron ERC1155'}
              address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
              id={3}
              amount={100}
            />

            <SortBy />

            <BlueprintUpdateCard />
            <BlueprintInfoCard />
            <AdvancedFilter />
            <ProductBlueprintCard
              imageLink={woodShield}
              name="WoodShield"
              blueprintid={28}
              tsupply={100}
              address="0x55d398326f99059ff775485246999027b3197955"
            />

            <OwnBlueprintCard
              uri={ironShield}
              name="WoodShield"
              blueprintid={28}
              totalSupply={100}
              address="0x55d398326f99059ff775485246999027b3197955"
              myCardBadge={true}
            />

            <CoreRoutes />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
