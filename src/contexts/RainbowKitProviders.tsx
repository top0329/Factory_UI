import React, { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { bsc, sepolia } from 'wagmi/chains';

import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ProvidersProps {
  children: ReactNode;
}

const config = getDefaultConfig({
  appName: 'Factory',
  projectId: '3070123cded233b935f75e5531756a6a',
  chains: [bsc, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
