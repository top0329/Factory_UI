import React, { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { bsc, sepolia } from 'wagmi/chains';

import { createConfig, WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [ledgerWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'Factory',
    projectId: 'YOUR_PROJECT_ID',
  }
);

const config = createConfig({
  chains: [bsc, sepolia],
  transports: {
    [bsc.id]: http('https://rpc.ankr.com/bsc'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/'),
  },
  connectors,
});

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const RainbowKitProvider: React.FC<ProvidersProps> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default RainbowKitProvider;
