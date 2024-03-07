import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { ethers, Contract, ContractRunner } from 'ethers';
import { useAccount, useChainId } from 'wagmi';

import { Web3ContextType } from '../types';
import FactoryABI from '../abi/FactoryABI.json';
import BlueprintABI from '../abi/BlueprintABI.json';
import ProductABI from '../abi/ProductABI.json';
import { useEthersProvider, useEthersSigner } from '../utils/wagmi-ethers';
import {
  defaultRPC,
  factoryAddress,
  blueprintAddress,
  productAddress,
} from '../constants';

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  const [factoryContract, setFactoryContract] = useState<Contract>(
    {} as Contract
  );
  const [blueprintContract, setBlueprintContract] = useState<Contract>(
    {} as Contract
  );
  const [productContract, setProductContract] = useState<Contract>(
    {} as Contract
  );

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      factoryContract,
      blueprintContract,
      productContract,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      factoryContract,
      blueprintContract,
      productContract,
    ]
  );

  const init = useCallback(async () => {
    try {
      let _provider: ContractRunner;

      if (!isConnected || !provider) {
        const defaultProvider = new ethers.JsonRpcProvider(defaultRPC);
        _provider = defaultProvider;
        console.log('Not connected wallet');
      } else {
        _provider = provider;
        console.log('Connected wallet');
      }

      const _factoryContract: Contract = new ethers.Contract(
        factoryAddress,
        FactoryABI,
        _provider
      );
      const _blueprintContract: Contract = new ethers.Contract(
        blueprintAddress,
        BlueprintABI,
        _provider
      );
      const _productContract: Contract = new ethers.Contract(
        productAddress,
        ProductABI,
        _provider
      );

      setFactoryContract(_factoryContract);
      setBlueprintContract(_blueprintContract);
      setProductContract(_productContract);
    } catch (err) {
      console.log(err);
    }
  }, [isConnected, provider]);

  useEffect(() => {
    init();
  }, [init]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
