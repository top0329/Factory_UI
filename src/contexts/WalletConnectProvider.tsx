import React, { ReactNode } from 'react';
// import { polygon } from 'wagmi/chains';
import { polygon, polygonAmoy, sepolia } from 'wagmi/chains';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { Chain, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  phantomWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

import PolygonIcon from '../assets/images/polygon-icon.png';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        phantomWallet,
        ledgerWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Factory',
    projectId: '3070123cded233b935f75e5531756a6a',
  }
);

const chains: readonly [Chain, ...Chain[]] = [
  sepolia,
  polygon,
  {
    ...polygonAmoy,
    iconBackground: '#000',
    iconUrl: PolygonIcon,
  },
];
const config = createConfig({
  chains,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [polygon.id]: http('https://rpc.ankr.com/polygon'),
    [polygonAmoy.id]: http('https://polygon-amoy.drpc.org'),
  },
  connectors,
});

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const WalletConnectProvider: React.FC<ProvidersProps> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default WalletConnectProvider;
