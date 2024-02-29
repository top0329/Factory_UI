import React, { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { bsc, sepolia } from 'wagmi/chains';

import { createConfig, WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [ledgerWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'Factory',
    projectId: '3070123cded233b935f75e5531756a6a',
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

const WalletConnectProvider: React.FC<ProvidersProps> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default WalletConnectProvider;
